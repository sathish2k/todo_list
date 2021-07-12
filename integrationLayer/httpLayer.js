import Axios from 'Axios';

let Post = (url, data, config=null) => {
    // Axios.defaults.withCredentials = true
    return Axios.post(url, data,config)
}

let Get = (url,config=null) => {
    return Axios.get(url,config)
}

export { Post, Get }
