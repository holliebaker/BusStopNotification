import axios from 'axios'

const BUSTIMES_URL = 'https://bustimes.org'
const TRIPS_ROUTE = 'api/trips'

export default tripId =>
    axios.get(`${BUSTIMES_URL}/${TRIPS_ROUTE}/${tripId}?format=json`).then(({ data }) => {
        console.log(JSON.stringify(data,null,2))

        return {
            lineName: data.service.line_name
        }
    })

