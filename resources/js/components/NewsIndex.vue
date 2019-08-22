<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">News</li>
            </ol>
        </nav>
        <div class="form-group">
            <router-link :to="{name: 'createNews'}" class="btn btn-success btn-sm">Create news</router-link>
        </div>

        <div class="col-md-12" v-for="post, index in news.data">
            <div class="row">
                <div class="col-md-12">
                    <h4>
                        <strong> {{ post.title }} </strong>
                    </h4>
                </div>
            </div>

            <div class="row">
                <div class="col-md-10 post-header-line">
                    {{ post.created_at | localTime }}
                    <span class="separator">
                    last update {{ post.updated_at | localTime }}
                </span>

                    <router-link :to="{name: 'editNews', params: {id: post.id}}" class="btn btn-sm btn-warning">
                        Edit
                    </router-link>
                    <a href="#"
                       class="btn btn-sm btn-danger"
                       v-on:click="deleteEntry(post.id, index)">
                        Delete
                    </a>
                </div>
            </div>

            <div class="row post-content">
                <div class="col-md-9">
                    <p> {{ post.body }} </p>
                    <div class="col-md-4 post-header-line">
                        <strong>Category:</strong>
                        <router-link :to="{name: 'category', params: {id: post.categories_id}}" class="stretched-link">
                            {{ post.category.name}}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <pagination :data="news" @pagination-change-page="getResults"></pagination>
    </div>
</template>

<script>
    export default {

        props: [
            'filters'
        ],

        data: function () {
            return {
                news: {}
            }
        },

        mounted() {
            this.getResults();
        },

        methods: {
            getResults(page = 1) {
                var app = this;
                axios.get('/api/v1/news?page=' + page)
                    .then(response => {
                        app.news = response.data;
                    });
            },
            deleteEntry(id, index) {
                if (confirm("delete?")) {
                    var app = this;
                    axios.delete('/api/v1/news/' + id)
                        .then(function (resp) {
                            app.news.data.splice(index, 1);
                        })
                        .catch(function (resp) {
                            console.log("no del news");
                        });
                }
            }
        },
        filters: {
            localTime: function (date) {
                return moment(date).format('MMM Do YYYY, h:mm A')
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../css/component.css";
</style>
