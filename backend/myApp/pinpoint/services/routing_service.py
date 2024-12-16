import requests
import logging
from dotenv import load_dotenv
import os

load_dotenv()
api = os.getenv("MAPBOX")
logger = logging.getLogger(__name__)

def generate_route(coordinates, api_key="your_mapbox_api_key"):
    """
    Generate a route using the Mapbox Directions API.

    Args:
        coordinates (list): List of (longitude, latitude) tuples.
        api_key (str): Your Mapbox API key.

    Returns:
        dict: Route information including geometry, distance, and duration, or None if failed.
    """
    base_url = "https://api.mapbox.com/directions/v5/mapbox/driving"
    try:
        # Format coordinates for API
        coords_str = ";".join([f"{lon},{lat}" for lon, lat in coordinates])

        response = requests.get(
            f"{base_url}/{coords_str}",
            params={
                "access_token": api,
                "geometries": "geojson",  # Return route as GeoJSON
                "overview": "full",      # Full route geometry
                "steps": True            # Include turn-by-turn navigation
            }
        )
        response.raise_for_status()
        data = response.json()

        if data.get("routes"):
            route = data["routes"][0]  # Take the first route
            logger.info(f"Generated route with distance: {route['distance']} meters and duration: {route['duration']} seconds.")
            return {
                "geometry": route["geometry"],
                "distance": route["distance"],
                "duration": route["duration"],
                "steps": route["legs"][0]["steps"] if "legs" in route and route["legs"] else []
            }
        else:
            logger.warning("No routes found for the given coordinates.")
            return None
    except requests.exceptions.RequestException as e:
        logger.error(f"Error generating route: {e}")
        return None
