export default {
    hello:'Hello',
    login:'Login',
    movieEndpoint:'https://dummyapi.online/api/movies',
    geolocationEndpoint:(lat:any,long:any)=>`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=false&key=${apiKey}`

}
const apiKey='AIzaSyADb8oLVP_h3zijBuuN3ox8ha0C9lw0O1I'