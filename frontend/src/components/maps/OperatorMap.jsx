import React, { useEffect, useRef } from "react";
import mapboxgl from "./MapBoxLoader";
import axios from "axios";

const OperatorMap = ({ operatorId }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const route = useRef([]);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mindjoker/cm4qgiar2001v01qz26m20fq6",
        center: [10.401688, 43.722839], // Pisa, Italy
        zoom: 12,
      });
    }

    fetchRoute();
  }, [operatorId]);

  const fetchRoute = async () => {
    try {
      const response = await axios.get(`/api/operators/${operatorId}/route/`);
      route.current = response.data;
      plotRoute();
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const plotRoute = () => {
    if (!map.current || !route.current.geometry) return;

    const geoJson = {
      type: "Feature",
      geometry: route.current.geometry,
    };

    // Add or update the route on the map
    if (map.current.getSource("route")) {
      map.current.getSource("route").setData(geoJson);
    } else {
      map.current.addSource("route", {
        type: "geojson",
        data: geoJson,
      });

      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#1db7dd",
          "line-width": 4,
        },
      });
    }
  };

  return <div ref={mapContainer} className="map-container w-full h-96" />;
};

export default OperatorMap;
