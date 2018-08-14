<template>
    <section>
        <el-dialog
                title="员工信息修改"
                :visible.sync="showDialog"
                width="70%"
                :show-close="false">
            <el-form
                    :model="tmpStaffInfo"
                    size="small"
                    label-position="right"
                    label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="姓名">
                            <el-input v-model="tmpStaffInfo.employee_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="岗位">
                            <el-cascader
                                    expand-trigger="hover"
                                    :options="deptList"
                                    v-model="tmpStaffInfo.deptPos"
                                    @change="handleChange"
                                    separator="-"
                                    clearable
                                    filterable
                                    :props="{label: 'name',value: 'deptId'}">
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系方式">
                            <el-input v-model="tmpStaffInfo.employee_phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="月薪">
                            <el-input v-model="tmpStaffInfo.employee_salary"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="学历">
                            <el-select
                                    v-model="tmpStaffInfo.employee_edu"
                                    placeholder="请选择学历">
                                <el-option
                                        v-for="(value) in eduList"
                                        :key="value"
                                        :label="value"
                                        :value="value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="专业">
                            <el-input v-model="tmpStaffInfo.employee_professional"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="入职时间">
                            <el-date-picker
                                    style="width:100%"
                                    v-model="tmpStaffInfo.employee_entry_time"
                                    value-format="timestamp"
                                    type="date"
                                    placeholder="请选择时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工作年限">
                            <el-input v-model="tmpStaffInfo.employee_work_seniority" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身份证">
                            <el-input v-model="tmpStaffInfo.employee_idCard" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="权限">
                            <el-select
                                    v-model="tmpStaffInfo.powerLevel"
                                    clearable
                                    placeholder="请选择权限">
                                <el-option
                                        v-for="item in powerList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="现状态">
                            <el-select
                                    v-model="tmpStaffInfo.employee_status"
                                    clearable
                                    placeholder="请选择权限">
                                <el-option
                                        v-for="item in statusList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="showDialog=false">取 消</el-button>
                <el-button type="primary" size="small" @click="submitChange">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
</template>

<script>
    export default {
        data() {
            return {
                defaultPostMapDepartment:[],
                showDialog: false,
                departmentID:'',
                confirmedStaffInfo:{},
                tmpStaffInfo:{},
                deptList: [],
                eduList: ['博士','硕士','本科','大专','中专','高中','初中','其他'],
                powerList: [{
                    value: 0,
                    label: '普通员工'
                },{
                    value: 1,
                    label: '人事员工'
                },{
                    value: 2,
                    label: '管理员'
                }],
                statusList: [{
                    value: '0',
                    label: '待入职'
                },{
                    value: '1',
                    label: '实习'
                },{
                    value: '2',
                    label: '正式'
                },{
                    value: '3',
                    label: '请假'
                },{
                    value: '4',
                    label: '离职'
                }]
            }
        },
        methods: {
            editStaffInfo(row){
                this.showDialog=true;
                console.log(row);
                this.tmpStaffInfo = row;
            },
            submitChange() {
                console.log(this.tmpStaffInfo)
                this.$http.post('api/updateEmployee', {
                    employeeInfo: JSON.stringify(this.tmpStaffInfo)
                }).then((res) => {
                    console.log(res);
                    if (res.data === 'success') {
                        this.showDialog = false;
                        this.$emit('refresh')
                    }
                })
            }
        },
        created() {
            this.$http.get('/api/getDept')
                .then((res) => {
                console.log(res)
                this.deptList = res.data
                })
        }
    }

</script>

<style scoped>
    .el-select,.el-cascader{
        width:100%;
    }
</style>