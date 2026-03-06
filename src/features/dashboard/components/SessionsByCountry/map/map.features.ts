import type { FeatureCollection } from 'geojson'
import worldGeoJson from './world.geo.json'

export const mapFeatures = (worldGeoJson as FeatureCollection).features
