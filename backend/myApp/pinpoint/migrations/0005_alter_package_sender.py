# Generated by Django 5.1.4 on 2024-12-16 02:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pinpoint', '0004_remove_location_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='package',
            name='sender',
            field=models.CharField(max_length=255),
        ),
    ]