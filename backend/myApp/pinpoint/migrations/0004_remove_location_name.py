# Generated by Django 5.1.4 on 2024-12-15 18:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pinpoint', '0003_delete_jwttoken'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='location',
            name='name',
        ),
    ]
