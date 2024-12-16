from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import UntypedToken
from jwt import decode as jwt_decode, exceptions as jwt_exceptions
from django.conf import settings


@database_sync_to_async
def get_user(user_id):
    """
    Retrieve the user from the database.
    """
    User = get_user_model()
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()


class JWTAuthMiddleware():
    """
    Middleware to authenticate WebSocket connections using JWT tokens.
    """
    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        return JWTAuthMiddlewareInstance(scope, self.inner)


class JWTAuthMiddlewareInstance:
    def __init__(self, scope, inner):
        self.scope = scope
        self.inner = inner

    async def __call__(self, receive, send):
        # Extract the token from the query string
        query_string = self.scope.get('query_string', b'').decode('utf-8')
        params = parse_qs(query_string)
        token = params.get('token', [None])[0]  # Extract token from query string

        self.scope["user"] = AnonymousUser()  # Default to anonymous user

        if token:
            try:
                # Validate the token and decode user info
                UntypedToken(token)  # Checks validity
                decoded_data = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                user_id = decoded_data.get("user_id")
                self.scope["user"] = await get_user(user_id)
            except (jwt_exceptions.InvalidTokenError, Exception) as e:
                print(f"JWT validation failed: {e}")

        # Pass the scope to the WebSocket consumer
        inner = self.inner(self.scope)
        return await inner(receive, send)
