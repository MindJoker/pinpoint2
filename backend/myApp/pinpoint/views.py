import os
from rest_framework.renderers import TemplateHTMLRenderer
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .models import OperatorProfile, Package, Order, Location
from .serializers import (
    OperatorProfileSerializer,
    PackageSerializer,
    OrderSerializer,
    FileUploadSerializer,
    LocationSerializer
)
from .services.csv_parser import parse_csv_and_save
from uuid import uuid4
from django.urls import get_resolver, reverse


class FileUploadViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            uploaded_file = serializer.validated_data["file"]

            # Save the file temporarily
            file_path = os.path.join(settings.MEDIA_ROOT, f"{uuid4().hex}_{uploaded_file.name}")
            with open(file_path, "wb") as f:
                for chunk in uploaded_file.chunks():
                    f.write(chunk)

            # Open the file as a file object and pass it to parse_csv_and_save
            try:
                with open(file_path, "r", encoding="utf-8") as file_obj:
                    parse_csv_and_save(file_obj)  # Pass the file object, not the file path
                return Response({"message": "File processed successfully!"}, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({"error": f"Data validation error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({"error": f"Unexpected error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            finally:
                # Clean up the temporary file
                os.remove(file_path)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class OperatorProfileViewSet(viewsets.ViewSet):
    """
    A ViewSet for managing operators and their assignments.
    """

    def list(self, request):
        queryset = OperatorProfile.objects.all()
        serializer = OperatorProfileSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        details = request.data.get('details')

        if not username or not password:
            return Response(
                {"error": "Username and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create the User
        try:
            user = User.objects.create_user(username=username, password=password)
        except Exception as e:
            return Response({"error": f"Failed to create user: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        # Create the OperatorProfile
        operator_profile = OperatorProfile.objects.create(user=user, details=details)
        serializer = OperatorProfileSerializer(operator_profile)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        try:
            operator = OperatorProfile.objects.get(pk=pk)
        except OperatorProfile.DoesNotExist:
            return Response({"error": "Operator not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = OperatorProfileSerializer(operator)
        return Response(serializer.data)

    def update(self, request, pk=None):
        try:
            operator = OperatorProfile.objects.get(pk=pk)
        except OperatorProfile.DoesNotExist:
            return Response({"error": "Operator not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = OperatorProfileSerializer(operator, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        try:
            operator = OperatorProfile.objects.get(pk=pk)
        except OperatorProfile.DoesNotExist:
            return Response({"error": "Operator not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = OperatorProfileSerializer(operator, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            operator = OperatorProfile.objects.get(pk=pk)
        except OperatorProfile.DoesNotExist:
            return Response({"error": "Operator not found"}, status=status.HTTP_404_NOT_FOUND)
        operator.delete()
        return Response({"status": "Operator deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['post'])
    def assign(self, request, pk=None):
        try:
            operator = OperatorProfile.objects.get(pk=pk)
        except OperatorProfile.DoesNotExist:
            return Response({"error": "Operator not found"}, status=status.HTTP_404_NOT_FOUND)

        order_ids = request.data.get('orders', [])
        package_ids = request.data.get('packages', [])

        # Assign orders
        orders = Order.objects.filter(id__in=order_ids)
        operator.orders.add(*orders)

        # Assign packages
        packages = Package.objects.filter(id__in=package_ids)
        operator.packages.add(*packages)

        return Response({"status": "Assigned successfully"})

    @action(detail=True, methods=['post'])
    def revoke(self, request, pk=None):
        try:
            operator = OperatorProfile.objects.get(pk=pk)
        except OperatorProfile.DoesNotExist:
            return Response({"error": "Operator not found"}, status=status.HTTP_404_NOT_FOUND)

        order_ids = request.data.get('orders', [])
        package_ids = request.data.get('packages', [])

        # Revoke orders
        orders = Order.objects.filter(id__in=order_ids)
        operator.orders.remove(*orders)

        # Revoke packages
        packages = Package.objects.filter(id__in=package_ids)
        operator.packages.remove(*packages)

        return Response({"status": "Revoked successfully"})

    @action(detail=True, methods=['post'])
    def update_location(self, request, pk=None):
        """
        Custom action to update the operator's current location.
        """
        operator = get_object_or_404(OperatorProfile, pk=pk)
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')

        if not latitude or not longitude:
            return Response(
                {"error": "Latitude and longitude are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create or get the location
        location, _ = Location.objects.get_or_create(
            latitude=latitude,
            longitude=longitude
        )
        operator.current_location = location
        operator.save()

        return Response({
            "message": "Location updated successfully",
            "current_location": LocationSerializer(location).data,
        }, status=status.HTTP_200_OK)

    

class PackageViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing packages.
    """
    queryset = Package.objects.all().select_related('sender', 'recipient', 'operator')
    serializer_class = PackageSerializer


class OrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing orders, including related packages.
    """
    queryset = Order.objects.all().prefetch_related('packages', 'admin', 'customer', 'operator')
    serializer_class = OrderSerializer


class RouteIndexViewSet(viewsets.ViewSet):
    renderer_classes = [TemplateHTMLRenderer]

    def list(self, request):
        route_list = []
        processed_routes = set()  # To avoid duplicates

        # Helper function to traverse URL patterns
        def traverse_urlpatterns(urlpatterns):
            for url_pattern in urlpatterns:
                if hasattr(url_pattern, 'url_patterns'):  # Handle included patterns
                    traverse_urlpatterns(url_pattern.url_patterns)
                else:
                    try:
                        route_name = url_pattern.name
                        route_path = reverse(route_name) if route_name else str(url_pattern.pattern)
                        if route_path and route_path not in processed_routes:
                            processed_routes.add(route_path)
                            route_list.append({'name': route_name or 'Unnamed', 'path': route_path})
                    except Exception:
                        pass  # Ignore patterns that can't be resolved

        # Get the root resolver and traverse patterns
        resolver = get_resolver()
        traverse_urlpatterns(resolver.url_patterns)

        # Explicitly add the admin route
        admin_path = reverse('admin:index')  # 'admin:index' is the default name for the Django admin home
        if admin_path not in processed_routes:
            route_list.append({'name': 'Admin', 'path': admin_path})

        return Response({'routes': route_list}, template_name='route_index.html')
