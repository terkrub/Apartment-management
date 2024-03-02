import axios from 'axios';

const axiosConfigured = axios.create({
    baseURL: 'http://localhost:4500/'
});

axiosConfigured.interceptors.request.use(config => {
    const selectedDb = localStorage.getItem('branch') || 'LaithongHouse';
    const token = localStorage.getItem('token');
    
    // Add dbName to the headers
    config.headers = {
        ...config.headers,
        'dbName': selectedDb,
        'Authorization': token
    };

    // Check if config.data is a string and parse it
    if (typeof config.data === 'string') {
        try {
            config.data = JSON.parse(config.data);
        } catch (e) {
            // Handle the error if the data is not valid JSON
            console.error('Error parsing JSON data in Axios interceptor', e);
            return Promise.reject(e);
        }
    }
    
    // No need to modify config.data to add dbName

    // Stringify the data again if it was originally a string and parsed
    if (typeof config.data === 'object') {
        config.data = JSON.stringify(config.data);
    }
    
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosConfigured;
