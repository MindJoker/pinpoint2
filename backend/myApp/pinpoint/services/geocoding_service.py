import requests
import logging
from dotenv import load_dotenv
import os

load_dotenv()
api = os.getenv("MAPBOX")

logger = logging.getLogger(__name__)

def geocode_address(address, api_key="your_mapbox_api_key"):
    """
    Geocode an address using the Mapbox Geocoding API.

    Args:
        address (str): The address to geocode.
        api_key (str): Your Mapbox API key.

    Returns:
        dict: A dictionary containing latitude and longitude or None if failed.
    """
    base_url = "https://api.mapbox.com/geocoding/v5/mapbox.places"
    try:
        response = requests.get(
            f"{base_url}/{address}.json",
            params={
                "access_token": api,
                "limit": 1,
            }
        )
        response.raise_for_status()
        data = response.json()

        if data.get("features"):
            coords = data["features"][0]["geometry"]["coordinates"]
            logger.info(f"Geocoded {address}: {coords}")
            return {"longitude": coords[0], "latitude": coords[1]}
        else:
            logger.warning(f"No geocoding results for address: {address}")
            return None
    except requests.exceptions.RequestException as e:
        logger.error(f"Error geocoding address {address}: {e}")
        return None
