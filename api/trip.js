import axios from 'axios'

const BUSTIMES_URL = 'https://bustimes.org'
const TRIPS_ROUTE = 'api/trips'
const VEHICLE_JOPRNEYS_ROUTE = 'api/vehiclejourneys'

// returns a formatted list of upcoming stops based on vehicle progress
const findUpcomingStops = (progress, stops) => {
    const nextStopIndex = stops.findIndex(item => item.stop.atco_code == progress.next_stop)
    
    console.log(JSON.stringify(stops[0], null, 2))

    return stops.slice(nextStopIndex).map(item => ({
        key: item.stop.atco_code,
        name: item.stop.name,
        bearing: item.stop.bearing,
        time: item.aimed_arrival_time || item.aimed_departure_time,
    }))
}

export default async tripId => {
    const [ trip, vehicleJourneys ] = await Promise.all([
        axios.get(`${BUSTIMES_URL}/${TRIPS_ROUTE}/${tripId}?format=json`),
        axios.get(`${BUSTIMES_URL}/${VEHICLE_JOPRNEYS_ROUTE}?trip=${tripId}`),
    ]).then(res => res.map(({ data }) => data)).catch(e => {
        throw e
    })
    
    // extract the vehicle journey corresponding to the trip
    if (!vehicleJourneys.results?.length) throw Error('Cannot find vehicle journey.')
    const journey = vehicleJourneys.results[0]
    const vehicleId = journey.vehicle.id

    const vehicles = await axios.get(`${BUSTIMES_URL}/vehicles.json?id=${vehicleId}`)
        .then(({ data }) => data).catch(e => {
            throw e
        })

    if (!vehicles.length) throw Error('No corresponding vehicle found.')

    return {
        serviceNumber: journey.route_name,
        destination: journey.destination,
        upcomingStops: findUpcomingStops(vehicles[0].progress, trip.times)
    }
}
