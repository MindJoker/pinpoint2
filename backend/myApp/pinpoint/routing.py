from django.urls import path
from .consumers import ChatConsumer, LocationConsumer

websocket_urlpatterns = [
    path('ws/chat/<str:room_name>/', ChatConsumer.as_asgi()),  # Chat WebSocket
    path('ws/location/', LocationConsumer.as_asgi()),  # Location WebSocket
]
