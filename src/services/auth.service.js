import api from '@/services/api.service';

export default {
    async login(username, password) {
        const response = await api.auth(username, password);
        if (response.id) {
            const user = {
                'username': username,
                'password': password,
                'id': response.id
            };
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            this.logout();
            location.reload();
        }
    },
    logout() {
        localStorage.removeItem('user');
    },
    getAuthData() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.username && user.password) {
            return window.btoa(user.username + ':' + user.password);
        } else {
            return null;
        }
    }
};
