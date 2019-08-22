<template xmlns="http://www.w3.org/1999/html">
    <div class="col-md-12">
        <div class="col-md-10 post-header-line">
            <div class="row">
                <div class="col-md-12">
                    <h6>
                        <strong> {{ item.title }} </strong>
                    </h6>
                </div>
            </div>

            <div class="row post-content">
                <div class="col-md-9">
                    <p> {{ item.body }} </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        methods: {},
        filters: {
            localTime: function (date) {
                return moment(date).format('MMM Do YYYY, h:mm A')
            },
            log: function () {
                console.log(this.item);
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../css/component.css";
</style>

