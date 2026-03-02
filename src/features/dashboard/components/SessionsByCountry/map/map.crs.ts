import L from 'leaflet'
import 'proj4leaflet'

export const robinsonCrs = new L.Proj.CRS(
    'ESRI:54030',
    '+proj=robin +lon_0=0 +x_0=0 +y_0=0 +units=m +no_defs',
    {
        origin: [0, 0],
        resolutions: [65536, 32768, 16384, 8192, 4096, 2048, 1024, 512, 256],
    },
)
