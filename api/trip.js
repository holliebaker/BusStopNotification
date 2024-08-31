import axios from 'axios'

const BUSTIMES_URL = 'https://bustimes.org'
const TRIPS_ROUTE = 'api/trips'
const VEHICLE_JOPRNEYS_ROUTE = 'api/vehiclejourneys'

const findUpcomingStops = (progress, stops) => {
    if (!progress) return null

    const nextStop = progress.next_stop
    const nextStopIndex = stops.findIndex(item => item.stop.atco_code == nextStop)
    console.log(nextStop, nextStopIndex, stops.length)
    const upcomingStops = stops.slice(nextStopIndex)
    const formatted = upcomingStops.map(item => ({
        name: item.stop.name,
        bearing: item.stop.bearing,
        time: item.aimed_arrival_time || item.aimed_departure_time,
    }))

    console.log("Upcoming stops", JSON.stringify([upcomingStops[0],formatted[0]], null, 2))
    return upcomingStops
}

export default async tripId => {
    const [ trip, vehicleJourneys ] = await Promise.all([
        axios.get(`${BUSTIMES_URL}/${TRIPS_ROUTE}/${tripId}?format=json`),
        axios.get(`${BUSTIMES_URL}/${VEHICLE_JOPRNEYS_ROUTE}?trip=${tripId}`),
    ]).then(res => res.map(({ data }) => data)).catch(e => {
        console.log(e)
    })
    
    if (!vehicleJourneys.results.length) return null

    const journey = vehicleJourneys.results[0]
    const vehicleId = journey.vehicle.id

    const vehicles = await axios.get(`${BUSTIMES_URL}/vehicles.json?id=${vehicleId}`)
        .then(({ data }) => data).catch(e => {
            console.log(e)
        })
    
    const vehicle = vehicles[0]
    console.log(JSON.stringify(vehicle, null, 2))
    return {
        lineName: `${journey.route_name} to ${journey.destination}`,
        upcomingStops: findUpcomingStops(vehicle.progress, trip.times)
    }
}
