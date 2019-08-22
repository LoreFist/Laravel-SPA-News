<template>
    <div>
        <div class="form-group">
            <router-link to="/" class="btn btn-default">Back</router-link>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">Create new post</div>
            <div class="panel-body">
                <form v-on:submit="saveForm()">
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Title</label>
                            <input type="text" v-model="news.title" class="form-control">
                            <span v-if="news.errors.title" class="badge badge-pill badge-danger">{{ news.errors.title[0] }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Body</label>
                            <input type="text" v-model="news.body" class="form-control">
                            <span v-if="news.errors.body" class="badge badge-pill badge-danger">{{ news.errors.body[0] }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Category</label>
                            <select type="text" v-model="news.categories_id" class="form-control">
                                <option v-for="category in categories" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                            <span v-if="news.errors.categories_id" class="badge badge-pill badge-danger">{{ news.errors.categories_id[0] }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <button class="btn btn-success">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                categories: {},
                news: {
                    title: '',
                    body: '',
                    categories_id: '',
                    errors: {}
                }
            }
        },
        mounted() {
            let app = this;

            axios.get('/api/v1/category/')
                .then(function (resp) {
                    app.categories = resp.data;
                })
                .catch(function () {
                    alert("no load categories")
                });
        },
        methods: {
            saveForm() {
                event.preventDefault();
                var app = this;
                var newNews = app.news;
                axios.post('/api/v1/news', newNews)
                    .then(function (resp) {
                        app.$router.push({path: '/'});
                    })
                    .catch(function (resp) {
                        if (resp.response.status == 422) {
                            app.news.errors = resp.response.data.errors;
                        }
                    });
            }
        }
    }
</script>
