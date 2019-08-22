<template>
    <div>
        <div class="col-md-12">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link :to="{name: 'NewsIndex'}">News</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Category</li>
                </ol>
            </nav>
            <div class="row">
                <div class="col-md-12">
                    <h4>
                        Categoty name: <strong> {{ category.name }} </strong>
                    </h4>
                </div>
                <div class="col-md-12">
                    <p>News attached category:</p>
                </div>
            </div>
        </div>

        <categoryt-list-item
            v-for="item in category.news"
            :key="item.id"
            :item="item"
        >
        </categoryt-list-item>
    </div>
</template>

<script>
    import CategorytListItem from "./CategorytListItem";

    export default {
        components: {CategorytListItem},

        props: [
            'filters', 'id'
        ],

        data: function () {
            return {
                category: {}
            }
        },

        created() {
            console.log(this.id);
            this.getResults();
        },

        methods: {
            getResults() {
                var app = this;
                axios.get(`/api/v1/category/show/${this.id}`)
                    .then(response => {
                        console.log(response.data);
                        app.category = response.data;
                    });
            }
        },

        filters: {
            localTime: function (date) {
                return moment(date + ' Z', 'YYYY-MM-DD HH:mm:ss Z', true).format('D MMM YYYY HH:mm');
            }
        },

    }
</script>
