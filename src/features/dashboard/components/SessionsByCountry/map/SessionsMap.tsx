import { MapContainer, GeoJSON } from 'react-leaflet'
import { robinsonCrs } from './map.crs'
import { createOnEachFeature } from './map.tooltip'
import { geoJsonStyle } from './map.style'
import type { FeatureCollection } from 'geojson'
import worldGeoJson from './world.geo.json'

type SessionsMapProps = {
    className?: string
}

export const SessionsMap = ({ className }: SessionsMapProps) => {
    return (
        <MapContainer
            className={className}
            crs={robinsonCrs}
            center={[10, 15]}
            zoom={0.2}
            zoomSnap={0}
            zoomControl={false}
            dragging={false}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            attributionControl={false}
        >
            <GeoJSON
                data={worldGeoJson as FeatureCollection}
                onEachFeature={createOnEachFeature}
                style={geoJsonStyle}
            />
        </MapContainer>
    )
}
