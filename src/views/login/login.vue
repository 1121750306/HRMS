<template>
    <section class="bg">
        <el-card class="login-form">
            <div class="title">登录</div>
            <div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input
                                prefix-icon="el-icon-view"
                                placeholder="用户名"
                                v-model="loginForm.username"
                                :autofocus="true">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                                prefix-icon="el-icon-remove-outline"
                                placeholder="密码"
                                v-model="loginForm.password"
                                @keyup.enter.native="login"
                                type="password">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <el-button @click="login" type="primary">登录</el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button @click="resetForm('loginForm')" type="danger">重置</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            login() {
                this.$http.post('/api/login', {
                    username: this.loginForm.username,
                    password: this.loginForm.password
                }).then(res => {
                    console.log(res)
                    if (res.data.sign === 'true') {
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                            duration: 1000
                        });
                        sessionStorage.setItem('userInfo',JSON.stringify(res.data.employeeInfo))
                        this.$router.push({path:'/user/personalInfo'});
                    } else {
                        this.$message({
                            message: '用户名密码错误',
                            type: 'warning',
                            duration: 1000
                        });
                    }
                })
            }
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

<style lang="scss" rel="stylesheet/scss" scoped>
    .title {
        margin-bottom: 10px;
    }
    .bg {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        flex-direction: row;
        background: linear-gradient(to bottom right, rgb(50, 102, 152), rgb(102, 204, 203));
        .login-form {
            margin-top: 180px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.1);
            position: absolute;
            z-index: 999;
            box-shadow: 15px 15px 40px #222;
            div {
                img {
                    width: 40px;
                }
                h1 {
                    color: #fff;
                    display: inline;
                }
            }
            form {
                width: 300px;
                button {
                    width: 100%;
                }
            }
        }
    }

</style>