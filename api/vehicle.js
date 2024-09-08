import axios from 'axios'

const BUSTIMES_URL = 'https://bustimes.org'
const VEHICLE_ROUTE = 'vehicles.json'

export default vehicleId => axios.get(`${BUSTIMES_URL}/${VEHICLE_ROUTE}?id=${vehicleId}`)
    .then(({ data }) => data.length && data[0]).then(vehicle => ({
        previousStop: vehicle.progress.prev_stop,
        nextStop: vehicle.progress.next_stop,
        delta: vehicle.progress.progress,
        delay: vehicle.delay,
    }))
