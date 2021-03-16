import axios from 'axios';
import userService from '@/services/auth.service';
import router from '@/services/router.service';

console.log(process.env);
// process.env.BACKEND_URL
const client = axios.create({
    baseURL: process.env.BACKEND_URL,
    json: true
});

export default {
    async execute(method, resource, data) {
        return client({
            method,
            url: resource,
            data,
            headers: this.authHeader()
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            if (err.response.status === 403 || err.response.status === 401) {
                router.replace('/login');
            }
            console.log(`Caught error invoking API using method of ${method} on resource of ${resource}.`, err);

            return err;
        });
    },
    auth(username, password) {
        localStorage.setItem('user', JSON.stringify({
            'username': username,
            'password': password
        }));
        return this.execute('get', '/api/user');
    },
    authHeader() {
        // return authorization header with basic auth credentials
        const authData = userService.getAuthData();
        if (authData) {
            return {'Authorization': 'Basic ' + authData};
        } else {
            return {};
        }
    },
    getItem(id) {
        return this.execute('get', `/api/items/${id}`);
    },
    getItems() {
        return this.execute('get', '/api/items');
    },
    createBid(id, value) {
        return this.execute('post', `/api/items/${id}/bid`, {value: value});
    },
    enableAutoBidding(id) {
        return this.execute('post', `/api/items/${id}/auto_bid`);
    },
    disableAutoBidding(id) {
        return this.execute('delete', `/api/items/${id}/auto_bid`);
    },
    getConfig() {
        return this.execute('get', '/api/config');
    },
    updateConfig(data) {
        return this.execute('post', '/api/config', data);
    }
};
