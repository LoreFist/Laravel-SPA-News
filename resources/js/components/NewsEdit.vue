<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{name: 'NewsIndex'}">News</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">News Edit</li>
            </ol>
        </nav>

        <div class="col-md-12">
            <div class="row">
                <form v-on:submit="saveForm()">
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Title</label>
                            <input type="text" v-model="news.title" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Body</label>
                            <input type="text" v-model="news.body" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Category</label>
                            <select type="text" v-model="news.categories_id" class="form-control">
                                <option v-for="category in categories" :value="category.id" :selected="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <button class="btn btn-success">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'filters'
        ],
        data: function () {
            return {
                news: {},
                categories: {}
            }
        },
        mounted() {
            let app = this;
            let id = app.$route.params.id;
            app.newsId = id;
            axios.get('/api/v1/news/' + id)
                .then(function (resp) {
                    app.news = resp.data.news;
                    app.categories = resp.data.categories;
                })
                .catch(function () {
                });
        },
        methods: {
            saveForm() {
                event.preventDefault();
                var app = this;
                var newNews = app.news;
                axios.patch('/api/v1/news/' + app.newsId, newNews)
                    .then(function (resp) {
                        app.$router.replace('/');
                    })
                    .catch(function (resp) {
                        console.log(resp)
                    });
            }
        }
    }
</script>
