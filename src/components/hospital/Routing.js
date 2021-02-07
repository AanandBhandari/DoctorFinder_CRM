import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet , MapLayer} from "react-leaflet";
class Routing extends MapLayer {
    createLeafletElement() {
        const { map } = this.props;
                // L.Routing.Itinerary({
                //         pointMarkerStyle: { radius: 5, color: '#03f', fillColor: 'black', opacity: 1, fillOpacity: 0.7 }
                //     })
        let leafletElement = L.Routing.control({
            waypoints: [L.latLng(map.props.center[0], map.props.center[1]), L.latLng(28.683359, 80.608063)],
            router: L.Routing.mapbox('pk.eyJ1IjoiYWFuYW5kYmhhbmRhcmkiLCJhIjoiY2s5OWh2dGVkMDQ0dDNlbnI1OGF2YXdnOSJ9.bYh6c9w2KoOu5WY-urL08A'),
            // routeWhileDragging: true
            // waypointMode: 'snap'
            useZoomParameter: true,
            showAlternatives: true,
           
            }).addTo(map.leafletElement);
            return leafletElement.getPlan();
            }
            }
export default withLeaflet(Routing);