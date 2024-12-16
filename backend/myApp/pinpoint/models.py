from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MinValueValidator, RegexValidator
import uuid
from django.utils import timezone


# Administration Profile model
class AdministrationProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='administration_profile')
    details = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"[{self.user.id}]Admin: {self.user.username}"


# Operator Profile model
class OperatorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='operator_profile')
    op_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    phone_number = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        validators=[RegexValidator(regex=r'^\+?1?\d{9,15}$')]
    )
    vehicle_details = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    details = models.CharField(max_length=100, blank=True)
    current_location = models.ForeignKey(
        'Location',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='current_operators',
        help_text="Current location of the operator"
    )
    assigned_routes = models.ManyToManyField(
        'Route',
        related_name='operators',
        blank=True,
        through='OperatorRouteAssignment'
    )
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"[{self.user.id}]OperatorID-{self.op_id}: {self.user.username}"


# Operator Route Assignment model
class OperatorRouteAssignment(models.Model):
    operator = models.ForeignKey(OperatorProfile, on_delete=models.CASCADE)
    route = models.ForeignKey('Route', on_delete=models.CASCADE)
    status = models.CharField(
        max_length=15,
        choices=[
            ('ASSIGNED', 'Assigned'),
            ('ACCEPTED', 'Accepted'),
            ('COMPLETED', 'Completed'),
            ('CANCELED', 'Canceled'),
        ],
        default='ASSIGNED'
    )
    assigned_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Assignment: Operator-{self.operator.id} -> Route-{self.route.id}"


# Customer model
class Customer(models.Model):
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    organization_name = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField()
    email = models.EmailField(unique=True)
    phone_number = models.CharField(
        max_length=15,
        validators=[RegexValidator(regex=r'^\+?1?\d{9,15}$')]
    )
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ['email', 'organization_name']

    def __str__(self):
        return self.organization_name or f'{self.first_name} {self.last_name}'


# Package model
class Package(models.Model):
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('normal', 'Normal'),
        ('high', 'High'),
    ]

    TYPE_CHOICES = [
        ('electronics', 'Electronics'),
        ('food', 'Food'),
        ('clothing', 'Clothing'),
        ('furniture', 'Furniture'),
        ('other', 'Other'),
    ]

    SIZE_CHOICES = [
        ('xs', 'Extra Small'),
        ('s', 'Small'),
        ('m', 'Medium'),
        ('l', 'Large'),
        ('xl', 'Extra Large'),
        ('xxl', 'Extra Extra Large'),
    ]

    tracking_number = models.CharField(max_length=15, unique=True)
    package_type = models.CharField(max_length=50, choices=TYPE_CHOICES, default='other')
    size = models.CharField(max_length=3, choices=SIZE_CHOICES, blank=True, null=True)
    weight = models.FloatField(blank=True, null=True, validators=[MinValueValidator(0)])
    sender = models.CharField(max_length=255)
    recipient = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='received_packages')
    current_status = models.CharField(
        max_length=15,
        choices=[
            ('PENDING', 'Pending'),
            ('IN_TRANSIT', 'In Transit'),
            ('DELIVERED', 'Delivered'),
            ('RETURNED', 'Returned'),
        ],
        default='PENDING'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    operator = models.ForeignKey(OperatorProfile, on_delete=models.SET_NULL, null=True, related_name="packages")
    details = models.TextField(blank=True)
    priority_level = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='normal')
    eta = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"Package {self.tracking_number} ({self.current_status})"


# Route model
class Route(models.Model):
    package = models.OneToOneField(Package, on_delete=models.CASCADE, related_name='route')
    origin = models.ForeignKey('Location', on_delete=models.CASCADE, related_name='origin_routes')
    destination = models.ForeignKey('Location', on_delete=models.CASCADE, related_name='destination_routes')
    is_active = models.BooleanField(default=True)
    stops = models.ManyToManyField('Location', related_name="routes", blank=True)
    eta = models.DateTimeField(blank=True, null=True)
    distance = models.FloatField(blank=True, null=True)
    geometry = models.JSONField(blank=True, null=True, help_text="GeoJSON or polyline for the route")
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Route for {self.package.tracking_number} from {self.origin} to {self.destination}"


# Location model
class Location(models.Model):
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    address = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ['latitude', 'longitude']

    def __str__(self):
        return self.address or f"Location ({self.latitude}, {self.longitude})"


# Order model
class Order(models.Model):
    ORDER_STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PROCESSED', 'Processed'),
        ('SHIPPED', 'Shipped'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled'),
    ]

    order_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    created_at = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=10, choices=ORDER_STATUS_CHOICES, default='PENDING')
    admin = models.ForeignKey(AdministrationProfile, on_delete=models.SET_NULL, null=True, related_name="orders")
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="orders")
    packages = models.ManyToManyField(Package, related_name="orders")
    operator = models.ForeignKey(OperatorProfile, on_delete=models.SET_NULL, null=True, blank=True, related_name="orders")
    notes = models.TextField(blank=True)

    def save(self, *args, **kwargs):
        # Check if the operator has changed
        if self.pk:  # Only do this for updates, not creates
            old_order = Order.objects.get(pk=self.pk)
            if old_order.operator != self.operator:
                # Update the operator for all associated packages
                self.packages.update(operator=self.operator)
        
        # Call the parent class's save method
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order {self.order_id} by {self.admin.user.username if self.admin else 'Unknown Admin'}"



class ChatMessage(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_messages")
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_messages")
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} -> {self.recipient}: {self.message[:30]}"
