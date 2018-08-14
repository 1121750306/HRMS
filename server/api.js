/**
 * Created by wanganyu on 2018/3/14.
 */
const models = require('./db');
const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
const check = require('./check')
const checkLogin = check.checkLogin
const checkNotLogin = check.checkNotLogin

router.get('/', (req, res) => {
    res.send('---')
})
// 新增三种默认用户
router.get('/api/addDefaultUsers', (req, res) => {
    models.WorkIdNote.find((err, docs) => {
        if (err) {

        } else {
            if (docs.length < 1) {
                let arg = new models.WorkIdNote({nextWorkId: '10001', id: '1'});
                arg.save()
            }
        }
    })
    models.Dept.find((err, docs) => {
        if (err) {

        } else {
            if (docs.length < 1) {
                let arg = new models.Dept({
                    name: '公司',
                    deptId: 0,
                    type: 0,
                    nextId: 1,
                    children: []
                })
                arg.save((err, docss) => {
                    if (err) {
                        console.log(55555)
                    } else {
                        console.log(99999)
                    }
                })
            }
        }
    })
    models.EmployeeInfo.find((err, data) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            if (data.length !== -1) {
                let obj1 = {
                    employee_workId: '0000',
                    employee_name: '初始员工',
                    employee_sex: 'male',
                    employee_edu: '本科',
                    employee_phone: '13312341234',
                    employee_status: 2,
                    employee_professional: '软件工程',
                    employee_work_seniority: 4,
                    powerLevel: 0,
                    employee_idCard: '332264198601234467',
                };
                let obj2 = {
                    employee_workId: '0001',
                    employee_name: '初始人事',
                    employee_sex: 'male',
                    employee_edu: '本科',
                    employee_phone: '17712341234',
                    employee_status: 2,
                    employee_professional: '软件工程',
                    employee_work_seniority: 3,
                    powerLevel: 1,
                    employee_idCard: '332264198601237956',
                }
                let obj3 = {
                    employee_workId: '0002',
                    employee_name: '初始管理',
                    employee_sex: 'male',
                    employee_edu: '本科',
                    employee_phone: '15512341234',
                    employee_status: 2,
                    employee_professional: '软件工程',
                    employee_work_seniority: 6,
                    powerLevel: 2,
                    employee_idCard: '332264198601231376'
                }
                addNewEmployee(obj1, (result) => {
                    addNewEmployee(obj2, (result) => {
                        addNewEmployee(obj3, (result) => {
                            res.send(result)
                        })
                    })
                })
            } else {
                res.send(data)
            }
        }
    })
})

// 登录
router.post('/api/login', function (req, res) {
    // req.session.user = req.body.userInfo
    let username = req.body.username;
    let password = req.body.password;
    models.LoginInfo.find({username: username}, (err, docs) => {
        if (err) {

        } else {
            if (docs.length != 1) {
                console.log('账号密码错误')
                let result = {
                    sign: 'false'
                }
                res.send(result)
                // res.send('false')
            } else {
                console.log(docs[0]);
                if (password === docs[0].password) {
                    console.log('成功登录')
                    let result = {
                        sign: 'true',
                        powerLevel: docs[0].powerLevel,
                        employeeInfo: {}
                    }
                    console.log(docs[0].userId)
                    models.EmployeeInfo.findById(docs[0].userId, (err, docss) => {
                        if (err) {
                            console.log('-----')
                        } else {
                            console.log(docss[0])
                            result.employeeInfo = docss;
                            console.log(result.employeeInfo)
                            req.session.user = docs[0]
                            res.send(result)
                        }
                    })

                } else {
                    console.log('账号密码错误')
                    let result = {
                        sign: 'false'
                    }
                    res.send(result)
                    // res.send('false')
                }
            }
        }
    })
})

router.get('/api/getEmployees', (req, res) => {
    let employee_name = req.query.employee_name;
    let powerLevel = req.query.powerLevel;
    let employee_status = req.query.employee_status;
    let employee_workId = req.query.employee_workId
    let arg = {};
    if (employee_name) arg.employee_name = new RegExp(employee_name);
    if (powerLevel) arg.powerLevel = powerLevel;
    if (employee_status) arg.employee_status = employee_status;
    if (employee_workId) arg.employee_workId = employee_workId;
    console.log(arg)
    console.log(req.query)
    models.EmployeeInfo.find(arg, (err, docs) => {
        // console.log(docs)
        res.send(docs)
    })
})

router.post('/api/addEmployee', (req, res) => {
    let arg = JSON.parse(req.body.employeeInfo);
    models.WorkIdNote.find((err, docs) => {
        let workId = docs[0].nextWorkId;
        let deptPos = arg.deptPos;
        let deptNameArr = [];
        let pos = 0;
        models.Dept.find((err0, docs0) => {
            console.log(deptNameArr)
            let traver = function(part) {
                let deptId = -1;
                let result = -1;
                let preResult = -1
                if (part.deptId === deptPos[pos]) {
                    deptNameArr.push(part.name);
                    console.log(deptNameArr)
                    pos++;
                    result = 1;
                    if (part.children.length > 0) {
                        // console.log(333)
                        for (let i = 0; i < part.children.length; i++) {
                            preResult = traver(part.children[i]);
                            if (preResult !== -1) {
                                break;
                            }
                        }
                    }
                }
                return result;
            }
            traver(docs0[0])
            arg.pos_name = deptNameArr.pop();
            arg.dept_name = deptNameArr.pop();
            let employeeObj = {
                employee_workId: workId,
                employee_name: arg.employee_name,
                employee_sex: 'male',
                employee_edu: arg.employee_edu,
                employee_phone: arg.employee_phone,
                employee_status: arg.employee_status,
                employee_professional: arg.employee_professional,
                employee_work_seniority: arg.employee_work_seniority,
                powerLevel: arg.powerLevel,
                employee_entry_time: arg.employee_entry_time,
                employee_idCard: arg.employee_idCard,
                employee_salary: arg.employee_salary,
                dept_name: arg.dept_name,
                pos_name: arg.pos_name,
                deptPos: arg.deptPos,
            }
            addNewEmployee(employeeObj, (result) => {
                models.WorkIdNote.find({id: '1'}, (err1, docs1) => {
                    docs1[0].nextWorkId = '' + (parseInt(workId) + 1);
                    docs1[0].save()
                    res.send(result)
                })
            })
        })

    })
})

// 部门岗位操作
router.get('/api/getDept', (req, res) => {
    models.Dept.find((err, docs) => {
        console.log(1)
        let traver = function(part) {
            let result = -1;
            if (part.type === 1) {
                console.log(part)
                delete part.children;
            } else if (part.children.length > 0) {
                for (let i = 0; i < part.children.length; i++) {
                    result = traver(part.children[i]);
                }
            }
            return result;
        }
        let arr = traver(docs[0])
        console.log(1)
        res.send(docs)
    })
})

router.post('/api/addDept', (req, res) => {
    let name = req.body.name;
    let type = req.body.type;
    let parentId = req.body.parentId;
    console.log(parentId)
    models.Dept.find((err, docs) => {
        console.log(docs)
        let traver = function(part) {
            // console.log(555 + ' ' + part.children)
            console.log('*/*/*/*/*/')
            let deptId = -1;
            let result = -1;
            let preResult = -1
            let arg = [];
            if (part.deptId === parentId) {
                result = [parentId];
                part.children.push({
                    name: name,
                    type: type,
                    deptId: docs[0].nextId,
                    children: []
                })
            } else if (part.children.length > 0) {
                // console.log(333)
                for (let i = 0; i < part.children.length; i++) {
                    result = traver(part.children[i]);
                    if (result !== -1) {
                        result.push(part.deptId);
                        break;
                    }
                }
            }
            // console.log(555)
            return result;
        }
        let arr = traver(docs[0]);
        let deptId = docs[0].nextId;
        console.log(arr)
        if (arr.length < 0) {
            console.log('查询错误')
        } else {
            let arg = {};
            let cur = arg;
            arr.reverse();
            let target = '';// 存放新增到具体部门的位置
            for (let i = 0; i < arr.length; i++) {
                if (i > 0) {
                    cur.children = {
                        $elemMatch: {}
                    };
                    cur = cur.children.$elemMatch;
                    target += '.$.';
                }
                cur.deptId = arr[i];
                target += 'children'
            }
            // arg = {
            //     deptId: arr.pop(),
            //     children: {
            //         $elemMatch: {
            //             deptId: arr.pop()
            //         }
            //     }
            // }
            console.log(target)
            console.log(JSON.stringify(arg))
            let aa = {
                deptId: 0,
                children: {
                    $elemMatch: {
                        deptId: 1,
                        children: {
                            $elemMatch: {
                                deptId: 4
                            }
                        }
                    }
                }
            }
            console.log(JSON.stringify(docs))
            models.Dept.update({deptId: 0}, {
                $set: {
                    children: JSON.parse(JSON.stringify(docs[0].children))
                }
            }, (err1, docs1) => {
                models.Dept.update({
                    deptId: 0
                }, {
                    $inc: {nextId: 1}
                }, (err00, docs00) => {
                    console.log('989879878')
                    console.log(docs00)
                    res.send({
                        sign: true,
                        data: docs
                    })
                })
            })
         /*   models.Dept.update(aa, {
                $push: {
                    'children.$.children': {
                        name: name,
                        type: type,
                        deptId: deptId,
                        children: []
                    }
                }
            }, (err1, docs1) => {
                console.log('wgewgqqw')
                console.log(docs1)
                // models.Dept.update({
                //     deptId: 0
                // }, {
                //     $inc: {nextId: 1}
                // }, (err00, docs00) => {
                //     console.log('989879878')
                //     console.log(docs00)
                // })
            })*/
        }

    })
})

router.post('/api/deleteDept', (req, res) => {
    let deptId = req.body.deptId;
    models.Dept.find((err, docs) => {
        let traver = function(part) {
            let result = -1;
            if (part.deptId === deptId) {
                result = 1;
            } else if (part.children.length > 0) {
                for (let i = 0; i < part.children.length; i++) {
                    let traverResult = traver(part.children[i]);
                    if (traverResult === 1) {
                        console.log(part)
                        part.children.splice(i, 1)
                        console.log(part)
                        break;
                    }
                }
            }
            return result;
        }
        let arg = JSON.parse(JSON.stringify(docs[0]))
        traver(arg);
        models.Dept.update({deptId: 0}, {
            $set: {
                children: JSON.parse(JSON.stringify(arg.children))
            }
        }, (err1, docs1) => {
            res.send({
                sign: true,
                data: [arg]
            })
        })
    })
})

// 员工信息操作
router.post('/api/updateEmployee', (req, res) => {
    let arg = JSON.parse(req.body.employeeInfo);
    let deptPos = arg.deptPos;
    let deptNameArr = [];
    let pos = 0;
    console.log(deptPos)
    // models.EmployeeInfo.find({'_id': Object(arg._id)}, {$set: {"employee_phone": '15555667788'}})

    models.Dept.find((err, docs) => {
        let traver = function(part) {
            let deptId = -1;
            let result = -1;
            let preResult = -1
            if (part.deptId === deptPos[pos]) {
                deptNameArr.push(part.name);
                console.log(deptNameArr)
                pos++;
                result = 1;
                if (part.children.length > 0) {
                    // console.log(333)
                    for (let i = 0; i < part.children.length; i++) {
                        preResult = traver(part.children[i]);
                        if (preResult !== -1) {
                            break;
                        }
                    }
                }
            }
            return result;
        }
        traver(docs[0])
        // console.log(deptNameArr)
        arg.pos_name = deptNameArr.pop();
        arg.dept_name = deptNameArr.pop();
        // models.EmployeeInfo.save(arg)
        // models.EmployeeInfo.update({'employee_workId': '0001'}, arg)
        models.EmployeeInfo.findById(arg._id, (err, doc) => {
            if(!err){
                console.log("=================="+doc);
                doc.employee_name = arg.employee_name;
                doc.employee_sex = arg.employee_sex;
                doc.employee_edu = arg.employee_edu;
                doc.employee_phone = arg.employee_phone;
                doc.employee_status = arg.employee_status;
                doc.employee_professional = arg.employee_professional;
                doc.employee_work_seniority = arg.employee_work_seniority;
                doc.powerLevel = arg.powerLevel;
                doc.employee_salary = arg.employee_salary;
                doc.employee_idCard = arg.employee_idCard;
                doc.employee_entry_time = arg.employee_entry_time;
                doc.dept_name = arg.dept_name;
                doc.pos_name = arg.pos_name;
                doc.deptPos = arg.deptPos;
                console.log(doc)
                doc.save(() => {
                    res.send('success')
                })
            }else{
                console.log(err);
            }
        })
     })

})

function addNewEmployee(employeeObj, cb) {
    let employee = new models.EmployeeInfo(employeeObj);
    let result = '';
    models.EmployeeInfo.find({employee_workId: employeeObj.employee_workId}, (err, docs) => {
        if (err) {

        } else {
            if (docs.length > 0) {
                result = '该员工ID已经存在';
                sign = false;
                cb(result)
            } else {
                console.log(1111111)
                employee.save(() => {
                    models.EmployeeInfo.find({employee_workId: employeeObj.employee_workId}, (err, docs) => {
                        if (err) {
                            result = '查询错误'
                            console.log(err)
                            cb(result)
                        } else {
                            if (docs.length === 0) {
                                result = '保存员工信息后，查询不到数据';
                                cb(result)
                            } else {
                                let loginEntity = new models.LoginInfo({
                                    userId: mongoose.Types.ObjectId(docs[0]._id),
                                    username: employeeObj.employee_workId,
                                    password: 'default',
                                })
                                loginEntity.save((err, data) => {
                                    if (err) {
                                        console.log(3)
                                    } else {
                                        result = 'success'
                                        console.log(4)
                                        cb(result)
                                    }
                                })
                            }
                        }
                    })
                })
            }
        }
    })
}

module.exports = router;
