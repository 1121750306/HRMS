<template>
    <section>
        <div id="title">

        </div>
        <div id="header-container">
            <el-dropdown  size="small">
                <div id="header-protrait" class="el-dropdown-link">{{employeeInfo.employee_name}}</div>
                <el-dropdown-menu slot="dropdown">
                    <!--<el-dropdown-item>-->
                    <!--<i class="el-icon-info">1</i>-->
                    <!--</el-dropdown-item>-->
                    <el-dropdown-item>
                        <a class="click-li" @click="editPassword"><i class="el-icon-setting">修改密码</i></a>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <a class="click-li" @click="logout"><i class="el-icon-circle-close">注销</i></a>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <EditPassword ref="editPassword"></EditPassword>
        </div>
    </section>
</template>

<script>
    import EditPassword from './editPassword.vue'

    export default {
        components: { EditPassword},
        data() {
            return {
                editShow: false,
            }
        },
        props: {
            employeeInfo: {
                type: Object,
                default: {
                    employee_name: ''
                }
            }
        },
        methods: {
            editPassword() {
                console.log(this.$refs.editPassword)
                this.$refs.editPassword.show(true)
            },
            logout() {
                sessionStorage.setItem('userInfo', '')
                this.$router.push("/")
            }
        }
    }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    #header-protrait {

    }

    section {
        width: 100%;
        display: flex;
        justify-content: space-between;
        #title {
            display: flex;
            align-items: center;
        }
        #head-container {
            display: flex;
            align-items: center;
        }
    }

    .el-dropdown {
        margin-left: auto;
        #header-portrait {
            width: 30px;
            height: 30px;

            .user {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 2px;
                border: 1px solid #fff;
                /*margin-left: auto;*/
            }
        }

    }

    span {
        font-size: 14px;
        padding: 0 12px;
        a {
            color: #ccc;
            text-decoration: none;
        }
        a:hover {
            color: #fff;
        }
    }

    .click-li {
        width: 100%;
        display: inline-block;
    }
</style>