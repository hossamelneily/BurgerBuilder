import axios from 'axios'


const instance = axios.create({
    baseURL:'https://burgerbuilder-efc4e.firebaseio.com/'
})

export default instance