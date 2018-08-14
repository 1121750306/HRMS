<template>
    <section>
        <h2 id="title">个人信息</h2>
        <section id="info">
            <el-form
                    ref="form"
                    :model="form"
                    label-position="left"
                    label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="员工姓名">{{employeeInfo.employee_name}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别">{{employeeInfo.employee_sex==='male'?'男':'女'}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系方式">{{employeeInfo.employee_phone}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="部门">{{employeeInfo.dept_name}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="岗位">{{employeeInfo.pos_name}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="学历">{{employeeInfo.employee_edu}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="专业">{{employeeInfo.employee_professional}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="入职时间">{{timestampToTime(employeeInfo.employee_entry_time)}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工作年限">{{employeeInfo.employee_work_seniority}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item  label="身份证">{{idCardShow?employeeInfo.employee_idCard:'---------'}} <a class="click" @click="idCardChange"><i class="el-icon-view"></i></a></el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="薪资">{{salaryShow?employeeInfo.employee_salary:'---------'}} <a class="click" @click="salaryChange"><i class="el-icon-view"></i></a></el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="权限">{{showPowerLevel}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="现状态">{{showStatus}}</el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </section>

    </section>

</template>

<script>
    export default {
        props: {
            employeeInfo: {
                type: Object,
                default: {}
            }
        },
        computed: {
            showPowerLevel() {
                return this.powerArr[this.employeeInfo.powerLevel]
            },
            showStatus() {
                return this.statusArr[this.employeeInfo.employee_status]
            },

        },
        data() {
            return {
                test: 'awabb',
                statusArr: ['待入职', '实习', '正式', '请假', '离职'],
                powerArr: ['普通员工','人事员工','管理员'],
                idCardShow: false,
                salaryShow: false
            }
        },
        methods: {
            idCardChange() {
                this.idCardShow = !this.idCardShow
            },
            salaryChange() {
                this.salaryShow = !this.salaryShow
            },
            timestampToTime(timestamp) {
                let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = date.getDate() < 10 ? '0'+date.getMonth() : date.getMonth();
                return Y+M+D;
            }
        }
    }
</script>

<style scoped>
    .click:hover {
        cursor: pointer;
    }
    #title {
        margin-bottom: 40px;
        margin-left: 20px;
        font-weight: 500;
        font-size: 1.3em;
    }
    #info {
        min-height: 400px;
        margin: 0 20px;
        padding: 0px 50px;
        padding-top: 30px;
        box-shadow: 0 1px 6px rgba(26, 62, 99, 0.08);
        background: rgba(246,246,246,1);
        border-radius: 8px;
    }

</style>