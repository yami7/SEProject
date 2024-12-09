import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS

// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibmlraGlsLWRoaW1hbiIsImEiOiJjbTQ5OGIzM3cwOGRzMnZxMXY3bXlteHRyIn0.lwWrUHiojpTiRt-fajmzWg';

const Map = ({ onRouteUpdate }) => {
    const mapRef = useRef(null); // Ref for the Mapbox map instance
    const [contextMenu, setContextMenu] = useState(null); // State for context menu
    const [routePoints, setRoutePoints] = useState([]); // State to store start, waypoints, and end

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-118.243683, 34.052235], // [longitude, latitude] of Los Angeles
            zoom: 10, // Initial zoom level
        });

        mapRef.current = map;

        // Add a click event to display the context menu
        map.on('click', (event) => {
            const { lng, lat } = event.lngLat;

            // Show the context menu at the clicked position
            setContextMenu({
                x: event.point.x,
                y: event.point.y,
                lng,
                lat,
            });
        });

        return () => {
            map.remove();
        };
    }, []);

    const handleAddPoint = async (type) => {
        const { lng, lat } = contextMenu;

        // Add a marker based on the type of point
        const markerColor = type === 'start' ? 'green' : type === 'end' ? 'red' : 'blue';
        const marker = new mapboxgl.Marker({ color: markerColor })
            .setLngLat([lng, lat])
            .addTo(mapRef.current);

        // Update route points
        setRoutePoints((prev) => {
            const updatedPoints = [...prev];
            if (type === 'start') {
                updatedPoints[0] = { lng, lat, marker };
            } else if(type === 'waypoint'){
                updatedPoints[1] = { lng, lat, marker };
            } else if (type === 'end') {
                updatedPoints[2] = { lng, lat, marker };
            } else {
                updatedPoints.push({ lng, lat, marker });
            }
            return updatedPoints;
        });

        // Close the context menu
        setContextMenu(null);

        // Trigger a route update if start and end points are available
        if (type === 'end' || type === 'start') {
            const startPoint = routePoints[0];
            const endPoint = type === 'end' ? { lng, lat } : routePoints[1];
            if (startPoint && endPoint) {
                console.log('Sending coordinates to API:', startPoint, endPoint); // Debug log
                await fetchRoute(startPoint, endPoint);
            }
        }
    };

    const fetchRoute = async (start, end) => {
        const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
        console.log('API URL:', url); // Debug log

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.routes && data.routes[0]) {
                const route = data.routes[0].geometry.coordinates;

                // Update parent with the route data (start, waypoints, end)
                onRouteUpdate({
                    start,
                    end,
                    waypoints: routePoints.slice(1, -1).map((point) => ({ lng: point.lng, lat: point.lat })),
                    route, // Full route as returned by Mapbox
                });

                // Render route on the map
                if (mapRef.current.getSource('route')) {
                    mapRef.current.removeLayer('route');
                    mapRef.current.removeSource('route');
                }

                mapRef.current.addSource('route', {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: {
                            type: 'LineString',
                            coordinates: route,
                        },
                    },
                });

                mapRef.current.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': '#007cbf',
                        'line-width': 5,
                    },
                });
            } else {
                console.error('No routes found:', data);
            }
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <div
                id="map"
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                }}
            />
            {contextMenu && (
                <div
                    style={{
                        position: 'absolute',
                        top: contextMenu.y,
                        left: contextMenu.x,
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '10px',
                        zIndex: 10,
                    }}
                >
                    <p>Choose an option:</p>
                    {console.log('routePoints', routePoints)}
                    {!routePoints[0] && (
                        <button onClick={() => handleAddPoint('start')}>Set Start Point</button>
                    )}
                    {routePoints[0] && !routePoints[1] && (
                        <>
                            <button onClick={() => handleAddPoint('waypoint')}>Set Waypoint</button>
                            <button onClick={() => handleAddPoint('end')}>Set End Point</button>
                        </>
                    )}
                    {routePoints[0] && routePoints[1] && (
                         <button onClick={() => handleAddPoint('start')}>Set Start Point</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Map;
