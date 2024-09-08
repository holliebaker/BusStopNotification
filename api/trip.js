import axios from 'axios'

const BUSTIMES_URL = 'https://bustimes.org'
const TRIPS_ROUTE = 'api/trips'
const VEHICLE_JOPRNEYS_ROUTE = 'api/vehiclejourneys'

// format stop data
const formatStops = stops => stops.map(item => ({
    id: item.id,
    atcoCode: item.stop.atco_code,
    name: item.stop.name,
    bearing: item.stop.bearing,
    time: item.aimed_arrival_time || item.aimed_departure_time,
}))


export default async tripId => {
    const [ trip, vehicleJourneys ] = await Promise.all([
        axios.get(`${BUSTIMES_URL}/${TRIPS_ROUTE}/${tripId}?format=json`),
        axios.get(`${BUSTIMES_URL}/${VEHICLE_JOPRNEYS_ROUTE}?trip=${tripId}`),
    ]).then(res => res.map(({ data }) => data)).catch(e => {
        throw e
    })
    
    // extract the vehicle journey corresponding to the trip
    const journey = vehicleJourneys.results[0] || null
    const stops = formatStops(trip.times)
    const lastStop = stops.slice(-1)[0]

    return {
        serviceNumber: journey?.route_name || trip.service.line_name,
        destination: { to: journey?.destination || lastStop.name, stop: lastStop.name, time: lastStop.time },
        vehicleId: journey?.vehicle.id || null,
        stops
    }
}
