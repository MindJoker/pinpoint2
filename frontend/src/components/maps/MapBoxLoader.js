import mapboxgl from "mapbox-gl";

// Add your Mapbox access token here

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX;

export default mapboxgl;
