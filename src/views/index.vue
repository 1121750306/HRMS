<template>
    <div>
        <p class="message">{{message}}</p>
        <p>555</p>
        <p>888</p>
        <el-button>55</el-button>
        <router-view></router-view>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                message: '你猜猜我应该显示什么'
            }
        },
        created() {
            const a = 1;
            console.log(a)
        },
        mounted() {
            console.log(6);
            this.$http.get('/api/addDefaultUsers')
                .then((res) => {
                console.log(res)
                })
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">/*
    $color: #580;
    .message {
        color: $color;
    }*/
</style>
<style scoped lang="scss" rel="stylesheet/scss">
    .message {
        /*border: 4px solid #580;*/
    }
</style>
<style scoped lang="css" rel="stylesheet/css">
    .message {
        /*background: #666;*/
    }
</style>