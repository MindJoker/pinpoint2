from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OperatorProfileViewSet, OrderViewSet, PackageViewSet, FileUploadViewSet, RouteIndexViewSet

router = DefaultRouter()
router.register(r"upload_csv", FileUploadViewSet, basename="upload_csv")
router.register(r'operators', OperatorProfileViewSet, basename='operator')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'packages', PackageViewSet, basename='package')
# Define a standalone route for the index
route_index = RouteIndexViewSet.as_view({'get': 'list'})

urlpatterns = [
    path("", route_index, name="route-index"),  # Register empty space for RouteIndexViewSet
    path('api/', include(router.urls)),
]
