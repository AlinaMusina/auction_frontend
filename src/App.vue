<template>
    <div id="app">
        <b-navbar toggleable="md" type="dark" variant="dark">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item to="/" exact>Items</b-nav-item>
                    <b-nav-item to="/config" exact>Config</b-nav-item>
                    <li class="nav-item">
                        <a href="#" @click="logout()" class="nav-link">Log out</a>
                    </li>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <router-view />
    </div>
</template>

<script>
    import user from '@/services/auth.service';
    import router from '@/services/router.service';

    export default {
        name: 'app',
        methods: {
            logout: function () {
                user.logout();
                router.replace('/');
                router.go(0);
            }
        }
    };
</script>

<style>
    .header-panel {
        width: 100%;
        background-color: #eee;
        padding: 0.8rem;
        border-bottom: 1px solid #ddd;
    }
    h1, .h1 {
        font-size: 1.3rem;
        text-align: center;
    }
    .navbar-dark .navbar-nav .nav-link.router-link-exact-active {
        color:white;
    }

    thead {
        background-color: rgba(0, 0, 0, 0.09);
    }
    td {
        white-space: nowrap;
    }
    .table {
        outline: thin solid #ddd;
    }
    .app-container {
        margin-bottom: 1rem;
    }
</style>
