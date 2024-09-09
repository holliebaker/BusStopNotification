import axios from 'axios'

const BUSTIMES_URL = 'https://bustimes.org'
const VEHICLE_JOPRNEYS_ROUTE = 'api/vehiclejourneys'

export default tripByService = serviceId => {
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    return axios.get(`${BUSTIMES_URL}/${VEHICLE_JOPRNEYS_ROUTE}?service=${serviceId}`)
        .then(({ data }) => data.results).then(results =>
            results.filter(({ datetime }) => Date.parse(datetime) > now).sort((a,b) => Date.parse(a) > Date.parse(b)).map(({ id, trip_id, datetime }) => ({ id, tripId: trip_id, date: new Date(datetime) }))
        )
    }

