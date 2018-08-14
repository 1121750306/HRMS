<template>
    <section>
        <el-row style="margin: 0" :gutter="8">
            <el-col :span="4">
                <el-input prefix-icon="el-icon-search" placeholder="搜索姓名" v-model="searchObj.employee_name"
                          size="mini"></el-input>
            </el-col>
            <el-col :span="4">
                <el-input prefix-icon="el-icon-search" placeholder="搜索工号" v-model="searchObj.employee_workId"
                          size="mini"></el-input>
            </el-col>
            <el-col :span="4">
                <el-select
                        v-model="searchObj.employee_status"
                        clearable
                        size="mini"
                        placeholder="请选择状态">
                    <el-option
                            v-for="item in statusList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select
                        v-model="searchObj.powerLevel"
                        clearable
                        size="mini"
                        placeholder="请选择权限">
                    <el-option
                            v-for="item in powerList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" size="mini" @click="resetSearch">重置</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" size="mini" @click="searchEmployee">筛选</el-button>
            </el-col>
            <el-col>
                <el-button type="primary" size="mini" @click="createStaff">新增</el-button>
                <el-button size="mini" @click="handleExport">导出</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                        :data="employeeInfoFilter"
                        border
                        size="mini"
                        @row-dblclick="dbclick"
                        @selection-change="selectBox"
                        :row-style="rowStyle"
                        :cell-style="cellStyle"
                        :header-row-style="headerRowStyle">
                    <el-table-column
                            width="35"
                            type="selection">
                    </el-table-column>
                    <el-table-column
                            prop="employee_workId"
                            label="工号"
                            width="100px">
                    </el-table-column>
                    <el-table-column
                            prop="employee_name"
                            label="姓名"
                            width="150px">
                    </el-table-column>
                    <el-table-column
                            prop="pos_name"
                            label="职位"
                            width="150px">
                    </el-table-column>
                    <el-table-column
                            prop="dept_name"
                            label="部门"
                            width="150px">
                    </el-table-column>
                    <el-table-column
                            prop="employee_edu"
                            label="学历"
                            width="80px">
                    </el-table-column>
                    <el-table-column
                            prop="employee_salary"
                            label="薪资"
                            width="80px">
                    </el-table-column>
                    <el-table-column
                            label="现状态"
                            :formatter="formatStatus"
                            width="150px">
                    </el-table-column>
                    <el-table-column
                            prop="employee_phone"
                            label="联系方式"
                            width="180px">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editEmployee(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="resetPassword(scope.row)">重置</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="16">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[2, 10, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="staffCount">
                </el-pagination>
            </el-col>
        </el-row>
        <el-row>
            <DialogBox ref="editEmployeeRef" @refresh="addSuccess"></DialogBox>
        </el-row>
        <el-row>
            <AddEmployee ref="addEmployeeRef" @refresh="addSuccess"></AddEmployee>
        </el-row>
    </section>
</template>

<script>
    import DialogBox from './updateDialogBox.vue'
    import AddEmployee from './addEmployee.vue'

    export default{
        computed: {
            pageCount(){
                return parseInt(this.staffCount/this.pageSize)+1;
            },
            statusShow(val) {
                console.log(val)
                return '111'
            },
            employeeInfoFilter() {
                let currentPageStaffInfo=[];
                if(this.employeeInfo.length !== 0){
                    let currentPageHeaderIndex=(this.currentPage-1)*this.pageSize;
                    let currentPageTailIndex='';
                    if(this.currentPage===this.pageCount){
                        currentPageTailIndex = currentPageHeaderIndex + this.staffCount % this.pageSize - 1;
                    }else{
                        currentPageTailIndex=currentPageHeaderIndex+this.pageSize-1;
                    }
                    let tmpIndex=0;
                    for(let index=currentPageHeaderIndex;index<currentPageTailIndex+1;index++){
                        currentPageStaffInfo[tmpIndex++]=this.employeeInfo[index];
                    }
                }
                return currentPageStaffInfo;
            }
        },
        components: {
            DialogBox,
            AddEmployee
        },
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                staffCount: 0,
                searchValue: '',
                searchObj: {},
                employeeInfo: [],
                employee_name_arr: [],
                filters_post_name: [],
                filters_department_name: [],
                filters_employee_salary: [],
                emptyStaff: {},
                selectArr: [],
                selectEmployeeArr: [],
                arr: ['待入职', '实习', '正式', '请假', '离职'],
                powerList: [{
                    value: 0,
                    label: '普通员工'
                }, {
                    value: 1,
                    label: '人事员工'
                }, {
                    value: 2,
                    label: '管理员'
                }],
                statusList: [{
                    value: '0',
                    label: '待入职'
                }, {
                    value: '1',
                    label: '实习'
                }, {
                    value: '2',
                    label: '正式'
                }, {
                    value: '3',
                    label: '请假'
                }, {
                    value: '4',
                    label: '离职'
                }]
            }
        },
        methods: {
            editEmployee(row) {
                console.log(this.$refs.editEmployeeRef)
                this.$refs.editEmployeeRef.editStaffInfo(row);
            },
            formatStatus(val) {
                return this.arr[val.employee_status]
            },
            searchEmployee() {
                console.log(this.searchObj)
                this.$http.get('/api/getEmployees', {params: this.searchObj})
                    .then((res) => {
                        this.employeeInfo = res.data
                        this.staffCount = this.employeeInfo.length;
                    })
//                    .then((res) => console.log(3))
            },
            addSuccess() {
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.searchEmployee()
            },
            resetSearch() {
                this.$http.get('/api/getEmployees', {params: {}})
                    .then((res) => {
                        this.employeeInfo = res.data;
                        this.staffCount = this.employeeInfo.length;
                        this.searchObj = {};
                    })
            },
            resetPassword() {
                this.$confirm('此操作将重置该用户的密码, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(this.employeeInfoFilter)
            },
            handleSizeChange (val) {
                this.pageSize=val;
            },
            editStatus(row) {

            },
            createStaff() {
                console.log(this.$refs.addEmployeeRef)
                this.$refs.addEmployeeRef.editStaffInfo({});
            },
            handleExport() {

            },
            batchDelete() {

            }
        },
        created() {
//            this.$http.get('/api/getEmployees', {params: {powerLevel: 1}})
//                .then((res) => this.employeeInfo = res.data)
            this.$http.get('/api/getEmployees', {params: {}})
                .then((res) => {
                    this.employeeInfo = res.data
                    this.staffCount = this.employeeInfo.length;
                })
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    section {
        .top {
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            .el-col {

            }
            .el-col {

            }
            .el-col {
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
            }
        }
        .el-row {

        }
        .el-row {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 10px;
            .el-col {
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }
        }
    }

    .el-select > .el-input > .el-input__inner {
        color: #fff;
    }

    .el-checkbox {
        color: #606266;
    }
</style>