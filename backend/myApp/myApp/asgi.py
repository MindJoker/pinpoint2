import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from pinpoint.routing import websocket_urlpatterns
from pinpoint.middleware import JWTAuthMiddleware  # Import the custom middleware

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myApp.settings')

# Initialize Django application
django_asgi_app = get_asgi_application()

# Define ASGI application
application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AllowedHostsOriginValidator(
        JWTAuthMiddleware(
            URLRouter(
                websocket_urlpatterns
            )
        )
    ),
})
