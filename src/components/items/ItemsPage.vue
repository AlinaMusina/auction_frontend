<template>
    <div>
        <div class="header-panel">
            <h1 class="h1">Items</h1>
        </div>
        <div class="container-fluid mt-4 app-container">
            <div class="search-panel col-sm-3 form-group">
                <label for="search-element">Filter by name and description</label>
                <input v-model="searchKey" class="form-control" id="search-element"/>
            </div>
            <b-alert :show="loading" variant="info">Loading...</b-alert>
            <b-row>
                <b-col>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>
                                <a href="#" @click="sortByPrice()">
                                    Price
                                </a>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in filteredItems" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td><router-link :to="{ name: 'Item', params: { id: item.id }}">{{ item.name }}</router-link></td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.price }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="clearfix btn-group col-md-2 offset-md-5">
                        <button type="button" class="btn btn-sm btn-outline-secondary" v-if="page !== 1" @click="page--"> << </button>
                        <button type="button" class="btn btn-sm btn-outline-secondary" v-for="pageNumber in pages.slice(page-1, page+5)" @click="page = pageNumber"> {{pageNumber}} </button>
                        <button type="button" @click="page++" v-if="page < pages.length" class="btn btn-sm btn-outline-secondary"> >> </button>
                    </div>
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
                loading: false,
                searchKey: null,
                items: [],
                page: 1,
                perPage: 10,
                pages: [],
                sortStatus: 'desc'
            };
        },
        async created() {
            await this.refreshItems();
        },
        computed: {
            filteredItems: function () {
                const self = this;
                let items = [];
                if (!self.searchKey) {
                    items = self.items;
                } else {
                    items = self.items.filter(function (item) {
                        return (item.name &&
                                item.name.toLowerCase().indexOf(self.searchKey.toLowerCase()) !== -1) ||
                            (item.description &&
                                item.description.toLowerCase().indexOf(self.searchKey.toLowerCase()) !== -1
                            );
                    });
                }

                this.setPages(items);
                return this.paginate(items);
            }
        },
        methods: {
            sortByPrice() {
                if (this.sortStatus === 'desc') {
                    this.sortStatus = 'asc';
                } else {
                    this.sortStatus = 'desc';
                }

                const sortStatus = this.sortStatus;
                this.items.sort(function (a, b) {
                    const aCost = a.price ? a.price : 0;
                    const bCost = b.price ? b.price : 0;

                    if (sortStatus === 'desc') {
                        return aCost > bCost ? 1 : -1;
                    } else {
                        return bCost > aCost ? 1 : -1;
                    }
                });
            },
            async refreshItems() {
                this.loading = true;
                this.items = await api.getItems();
                this.loading = false;
            },
            setPages(items) {
                this.pages = [];
                const numberOfPages = Math.ceil(items.length / this.perPage);
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
            },
            paginate(items) {
                const page = this.page;
                const perPage = this.perPage;
                const from = (page * perPage) - perPage;
                const to = (page * perPage);

                return items.slice(from, to);
            }
        }
    };
</script>
