export default {
    hello:'Hello',
    login:'Login',
    movieEndpoint:'https://dummyapi.online/api/movies',
    geolocationEndpoint:(lat:any,long:any)=>`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=false&key=${apiKey}`

}
const apiKey='YOUR_API_KEy'
