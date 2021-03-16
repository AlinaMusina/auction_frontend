<template>
    <div>
        <div v-if="successMessage">
            <b-alert variant="success" show>{{ this.successMessage }}</b-alert>
        </div>
        <div v-if="errorMessage">
            <b-alert variant="danger" show>{{ this.errorMessage }}</b-alert>
        </div>
        <div class="container-fluid mt-4 app-container">
            <b-alert :show="loading" variant="info">Loading...</b-alert>
            <b-row>
                <b-col lg="4">
                    <table class="table" v-if="model.id">
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{{ model.name }}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{{ model.description }}</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>{{ model.price }}</td>
                        </tr>
                        <tr>
                            <td>End time</td>
                            <td>{{ model.end_time }}</td>
                        </tr>
                        <tr>
                            <td>Bidding history</td>
                            <td>
                                <li v-for="bid in model.bids">
                                    {{ bid }}
                                </li>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <form @submit.prevent="makeBid">
                                    <label for="bid_input">New bid:</label>
                                    <input id="bid_input" type="number" v-model="bid.value"/>
                                    <button type="submit" >Submit</button>
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <label for="auto_bidding">Auto bidding</label>
                                <input id="auto_bidding" type="checkbox" @change="autoBidding" v-model="model.auto_bidding"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import api from '@/services/api.service';

    export default {
        data() {
            return {
                id: this.$route.params.id,
                loading: false,
                model: {},
                bid: {},
                successMessage: null,
                errorMessage: null
            };
        },
        async created() {
            await this.refreshItem();
        },
        methods: {
            async refreshItem() {
                this.loading = true;
                this.model = await api.getItem(this.id);
                this.loading = false;
                this.bid = {};
            },
            afterAction(result) {
                if (result.success) {
                    this.successMessage = result.success;
                } else {
                    this.errorMessage = result.error;
                }
                this.refreshItem();
            },
            async makeBid() {
                const result = await api.createBid(this.model.id, +this.bid.value);
                this.afterAction(result);
            },
            async enableAutoBidding() {
                const result = await api.enableAutoBidding(this.model.id);
                this.afterAction(result);
            },
            async disableAutoBidding() {
                const result = await api.disableAutoBidding(this.model.id);
                this.afterAction(result);
            },
            async autoBidding() {
                if (this.model.auto_bidding) {
                    await this.enableAutoBidding();
                } else {
                    await this.disableAutoBidding();
                }
            }
        }
    };
</script>
