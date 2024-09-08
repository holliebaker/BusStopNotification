import axios from 'axios'

const BUSTIMES_URL = 'https://bustimes.org'
const VEHICLE_JOPRNEYS_ROUTE = 'api/vehiclejourneys'

export default tripByService = serviceId => 
    axios.get(`${BUSTIMES_URL}/${VEHICLE_JOPRNEYS_ROUTE}?service=${serviceId}`)
        .then(({ data }) => data.results).then(results =>
            results.slice(0,3).map(({ trip_id, datetime }) => ({ tripId: trip_id, date: Date(datetime) }))
        )

