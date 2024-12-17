from rest_framework import serializers
from .models import Customer, OperatorProfile, Package, Order, Location
from django.contrib.auth.models import User

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['latitude', 'longitude', 'address']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

# Customer Serializer
class CustomerSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField() 
    class Meta:
        model = Customer
        fields = '__all__'

# Operator Serializer
class OperatorProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()# Include related User fields
    current_location = LocationSerializer(read_only=True)  # Nested location details
    class Meta:
        model = OperatorProfile
        fields = '__all__'

# Package Serializer
class PackageSerializer(serializers.ModelSerializer):
    recipient = CustomerSerializer(read_only=True)  # Nested recipient details
    class Meta:
        model = Package
        fields = '__all__'

# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    packages = PackageSerializer(many=True, read_only=True)
    customer = CustomerSerializer(read_only=True)
    operator = serializers.PrimaryKeyRelatedField(queryset=OperatorProfile.objects.all())

    class Meta:
        model = Order
        fields = '__all__'

    def update(self, instance, validated_data):
        # Check if operator is updated
        new_operator = validated_data.get('operator', instance.operator)
        if new_operator != instance.operator:
            # Update operator for associated packages
            instance.packages.update(operator=new_operator)

        # Update the order instance
        return super().update(instance, validated_data)


class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

    def validate_file(self, value):
        if not value.name.endswith('.csv'):
            raise serializers.ValidationError("Only CSV files are allowed.")
        return value