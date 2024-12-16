import csv
import uuid
import logging
from .geocoding_service import geocode_address
from ..models import Customer, Location, Order, Package

logger = logging.getLogger(__name__)

def parse_csv_and_save(file):
    try:
        """
        Parse the uploaded CSV, geocode addresses, and save data to the database.
        """
        # Use csv.DictReader directly on the file object
        reader = csv.DictReader(file)

        for row_number, row in enumerate(reader, start=1):
            try:
                # Validate required fields
                required_fields = ["Sender","Address", "Package Type", "Email", "Size"]
                if any(field not in row or not row[field].strip() for field in required_fields):
                    logger.warning(f"Row {row_number}: Skipping due to missing required fields: {row}")
                    continue

                # Ensure either Customer Name or Organization Name is filled
                if not row.get("Customer Name", "").strip() and not row.get("Organization Name", "").strip():
                    logger.warning(f"Row {row_number}: Skipping due to missing Customer Name and Organization Name: {row}")
                    continue
                
                sender = row["Sender"]

                address = row["Address"]

                # Geocode the address
                geocoded = geocode_address(address)
                if not geocoded:
                    logger.warning(f"Row {row_number}: Geocoding failed for address: {address}")
                    continue

                # Create or get the customer
                customer, _ = Customer.objects.get_or_create(
                    email=row["Email"],
                    defaults={
                        "first_name": row.get("Customer Name", "").split()[0] if row.get("Customer Name", "").strip() else "",
                        "last_name": " ".join(row.get("Customer Name", "").split()[1:]) if row.get("Customer Name", "").strip() else "",
                        "organization_name": row.get("Organization Name", ""),
                        "phone_number": row.get("Phone", ""),
                        "address": address,
                    }
                )

                # Create or get the location
                location, _ = Location.objects.get_or_create(
                    address=address,
                    latitude=geocoded["latitude"],
                    longitude=geocoded["longitude"]
                )

                # Create the package
                package = Package.objects.create(
                    tracking_number=f"PKG-{uuid.uuid4().hex[:8]}",
                    package_type=row["Package Type"],
                    size=row["Size"],
                    sender=sender,
                    recipient=customer,
                    details=row.get("Order Notes", "")
                )

                # Create or update the order
                order, _ = Order.objects.get_or_create(
                    customer=customer,
                    shipping_address=address,
                    status="PENDING",
                )
                order.packages.add(package)

                logger.info(f"Row {row_number}: Successfully processed and saved data.")
            except Exception as row_error:
                logger.error(f"Row {row_number}: Error processing row: {row}. Error: {row_error}")
    except Exception as e:
        logger.error(f"General error processing file: {file}. Error: {e}")
        raise
