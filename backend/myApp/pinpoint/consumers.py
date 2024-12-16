from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model
import json
from .models import ChatMessage

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope["user"]

        # Reject the connection if the user is not authenticated
        if not user.is_authenticated:
            print("Unauthorized WebSocket connection attempt")
            await self.close(code=403)
            return

        # Extract room name and create a unique group name
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"

        # Log the authenticated user
        print(f"WebSocket connected: {user.username}")

        # Join the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave the room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        user = self.scope["user"]
        data = json.loads(text_data)

        if not user.is_authenticated:
            print("Received message from unauthenticated user")
            return

        message = data.get("message", "")

        # Broadcast the message to the room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "sender": user.username,
            }
        )

    async def chat_message(self, event):
        # Send the message to WebSocket
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "sender": event["sender"],
        }))
    
    



class LocationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        # Example: Send the location data back to the client
        await self.send(text_data=json.dumps({
            "type": "location_update",
            "data": data,
        }))