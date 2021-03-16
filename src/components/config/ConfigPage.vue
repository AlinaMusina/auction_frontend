<template>
    <div>
        <div v-if="successMessage">
            <b-alert variant="success" show>{{ this.successMessage }}</b-alert>
        </div>
        <div v-if="errorMessage">
            <b-alert variant="danger" show>{{ this.errorMessage }}</b-alert>
        </div>
        <div class="header-panel">
            <h1 class="h1">Config</h1>
        </div>
        <div class="container-fluid mt-4 app-container">
            <b-alert :show="loading" variant="info">Loading...</b-alert>
            <form @submit.prevent="saveConfig">
            <b-row>
                <b-col>
                    Max bid value
                </b-col>
                <b-col>
                    <input type="number" v-model="config.max_bid_value"/>
                </b-col>
            </b-row>
            <b-row>
                <button type="submit">Save</button>
            </b-row>
            </form>
        </div>
    </div>
</template>

<script>
    import api from '@/services/api.service';

    export default {
        data() {
            return {
                loading: false,
                config: {},
                successMessage: null,
                errorMessage: null
            };
        },
        async created() {
            await this.refresh();
        },
        methods: {
            async refresh() {
                this.loading = true;
                this.config = await api.getConfig();
                this.loading = false;
            },
            afterAction(result) {
                console.log(result);
                if (result.success) {
                    this.successMessage = result.success;
                } else {
                    this.errorMessage = result.error;
                }
                this.refresh();
            },
            async saveConfig() {
                const result = await api.updateConfig({max_bid_value: this.config.max_bid_value});
                this.afterAction(result);
            }
        }
    };
</script>
