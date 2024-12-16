# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import AdministrationProfile, OperatorProfile, OperatorRouteAssignment, Customer, Package, Route, Location, Order, ChatMessage


@admin.register(AdministrationProfile)
class AdministrationProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'details', 'created_at')
    list_filter = ('user', 'created_at')
    date_hierarchy = 'created_at'


@admin.register(OperatorProfile)
class OperatorProfileAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'op_id',
        'phone_number',
        'vehicle_details',
        'is_active',
        'details',
        'current_location',
        'created_at',
    )
    list_filter = ('user', 'is_active', 'current_location', 'created_at')
    raw_id_fields = ('assigned_routes',)
    date_hierarchy = 'created_at'


@admin.register(OperatorRouteAssignment)
class OperatorRouteAssignmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'operator', 'route', 'assigned_at', 'created_at')
    list_filter = ('operator', 'route', 'assigned_at', 'created_at')
    date_hierarchy = 'created_at'


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'first_name',
        'last_name',
        'organization_name',
        'address',
        'email',
        'phone_number',
        'created_at',
    )
    list_filter = ('created_at',)
    date_hierarchy = 'created_at'


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'tracking_number',
        'package_type',
        'size',
        'weight',
        'sender',
        'recipient',
        'current_status',
        'created_at',
        'operator',
        'details',
        'priority_level',
        'eta',
    )
    list_filter = ('created_at', 'eta')
    date_hierarchy = 'created_at'


@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'package',
        'origin',
        'destination',
        'is_active',
        'eta',
        'distance',
        'created_at',
    )
    list_filter = (
        'package',
        'origin',
        'destination',
        'is_active',
        'eta',
        'created_at',
    )
    raw_id_fields = ('stops',)
    date_hierarchy = 'created_at'


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('id', 'latitude', 'longitude', 'address', 'created_at')
    list_filter = ('created_at',)
    date_hierarchy = 'created_at'


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'order_id',
        'created_at',
        'status',
        'admin',
        'customer',
        'operator',
        'notes',
    )
    list_filter = ('created_at',)
    raw_id_fields = ('packages',)
    date_hierarchy = 'created_at'

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'recipient', 'message', 'timestamp')
    search_fields = ('sender', 'recipient', 'message',)