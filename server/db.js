/**
 * Created by wanganyu on 2018/3/14.
 */
// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27017/test');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
const testSchema = mongoose.Schema({
    msg : String
});

/* 正式的数据模式模型定义 */
const loginInfoSchema = mongoose.Schema({
    userId: {
        type :mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo'
    },
    username: String,
    password: String,
})

const deptSchema = mongoose.Schema({
    name: String,
    deptId: Number,
    nextId: Number,
    type: Number,// 0是部门，1是岗位
    children: Array
})

const workIdNote = mongoose.Schema({
    nextWorkId: String,
    id: String
})

const employeeInfoSchema = mongoose.Schema({
    employee_workId: String,
    employee_name: String,
    employee_sex: String,
    employee_edu: String,
    employee_entry_time: Number,
    employee_phone: String,
    employee_professional: String,
    employee_salary: String,
    employee_status: String,
    employee_idCard: String,
    employee_work_seniority: String,
    dept_name: String,
    pos_name: String,
    deptPos: Array,
    powerLevel: Number,
}, {
    versionKey: false
})
// employee_status : 0为待入职，1为实习，2为正式，3为请假，4为离职

const Models = {
    test : mongoose.model('test',testSchema),
    LoginInfo: mongoose.model('LoginInfo', loginInfoSchema),
    EmployeeInfo: mongoose.model('EmployeeInfo', employeeInfoSchema),
    Dept: mongoose.model('Dept', deptSchema),
    WorkIdNote: mongoose.model('WorkIdNote', workIdNote)
}

module.exports = Models;
