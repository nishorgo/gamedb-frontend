import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api/',
    params: {
        key: 'dfade1eeedfe48faa83e141e9a9ae60b'
    }
})