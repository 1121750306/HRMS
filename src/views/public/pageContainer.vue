<template>
    <el-container class="home" v-loading="loading">
        <el-aside width="230px">
            <div class="logo"></div>
            <pageAside :powerLevel="employeeInfo.powerLevel"></pageAside>
        </el-aside>
        <el-container>
            <el-header height="54px">
                <pageHeader :employeeInfo="employeeInfo"></pageHeader>
            </el-header>
            <el-main>
                <router-view :employeeInfo="employeeInfo"></router-view>
            </el-main>
            <!--<el-footer height="20px"></el-footer>-->
        </el-container>

    </el-container>
</template>

<script>
    import pageAside from '../../components/page/pageAside.vue'
    import pageHeader from '../../components/page/pageHeader.vue'

    export default{
        components:{
            pageAside,
            pageHeader
        },
        data() {
            return {
                employeeInfo: {}
            }
        },
        created() {
            let arg = sessionStorage.getItem('userInfo')
            this.employeeInfo = arg ? JSON.parse(arg) : {};
        }
    }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    .el-container {
        height: 99.9vh;
        .el-aside {
            background-image: linear-gradient(to top, #37ecba 0%, #72afd3 100%);
             .logo {
                background-color: rgba(5, 32, 44, 0.2);
                height: 54px;
                display: flex;
                justify-content: center;
            }
        }
        .el-container {
            .el-header {
                background-color: rgba(5, 32, 44, 0.2);
                color: #aaaaaa;
                display: flex;
                justify-content: start;
                align-items: center;

            }
            .el-main {
                background-color: rgba(255,255,255,.8);
            }
            .el-footer {
            }
        }
    }

</style>