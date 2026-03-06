import { geoRobinson } from 'd3-geo-projection'
import { geoPath } from 'd3-geo'

export const projection = geoRobinson().scale(150).translate([400, 250])

export const path = geoPath(projection)
