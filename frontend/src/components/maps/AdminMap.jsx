import React, { useEffect, useRef } from "react";
import mapboxgl from "./MapBoxLoader";
import axios from "axios";

const AdminMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const operators = useRef([]);
  const deliveries = useRef([]);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mindjoker/cm4qgiar2001v01qz26m20fq6",
        center: [10.401688, 43.722839], // Pisa, Italy
        zoom: 12,
      });

      // Fetch initial data
      fetchData();
    }

    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      // Fetch operators and deliveries from backend
      const [operatorResponse, deliveryResponse] = await Promise.all([
        axios.get("/api/operators/"),
        axios.get("/api/deliveries/"),
      ]);

      operators.current = operatorResponse.data;
      deliveries.current = deliveryResponse.data;

      // Update map markers
      updateMapMarkers();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateMapMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    operators.current.forEach((marker) => marker.remove?.());
    deliveries.current.forEach((marker) => marker.remove?.());

    // Add operator markers
    operators.current.forEach((operator) => {
      if (operator.current_location) {
        new mapboxgl.Marker({ color: "blue" })
          .setLngLat([
            operator.current_location.longitude,
            operator.current_location.latitude,
          ])
          .setPopup(
            new mapboxgl.Popup().setText(
              `Operator: ${operator.user.username}, Vehicle: ${operator.vehicle_details}`
            )
          )
          .addTo(map.current);
      }
    });

    // Add delivery markers
    deliveries.current.forEach((delivery) => {
      if (delivery.location) {
        new mapboxgl.Marker({ color: "red" })
          .setLngLat([delivery.location.longitude, delivery.location.latitude])
          .setPopup(
            new mapboxgl.Popup().setText(
              `Delivery: ${delivery.tracking_number}, Status: ${delivery.current_status}`
            )
          )
          .addTo(map.current);
      }
    });
  };

  return <div ref={mapContainer} className="map-container w-full h-96" />;
};

export default AdminMap;
