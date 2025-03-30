// Function to initialize the map
export function initMap(mapElementId, centerCoordinates, zoomLevel) {
    const map = L.map(mapElementId).setView(centerCoordinates, zoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    return map;
}

// Function to add markers to the map
export function addMarkers(map, locations, color, type) {
    locations.forEach(coord => {
        L.marker(coord, {
            icon: L.divIcon({
                className: 'custom-marker',
                html: `<div style="background:${color}; width:20px; height:20px; border-radius:50%"></div>`,
                iconSize: [20, 20]
            })
        }).bindPopup(`${type} Location<br>Lat: ${coord[0]}<br>Lon: ${coord[1]}`)
        .addTo(map);
    });
}

// Function to find the nearest location
export function findNearestLocation(userPosition, locations) {
    return locations.reduce((closest, current) => {
        const dist = L.latLng(userPosition).distanceTo(L.latLng(current));
        return dist < L.latLng(userPosition).distanceTo(L.latLng(closest)) ? current : closest;
    });
}

// Function to plot a route between two points
export function plotRoute(map, userPosition, destination) {
    const routingControl = L.Routing.control({
        waypoints: [L.latLng(userPosition), L.latLng(destination)],
        routeWhileDragging: true,
        router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1'
        })
    }).addTo(map);
}
