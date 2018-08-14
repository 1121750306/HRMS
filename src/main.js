/**
 * Created by wanganyu on 2018/3/13.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import  ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './app.vue'

import login from './views/login/login.vue'
import pageContainer from './views/public/pageContainer.vue'
import staffManage from './views/public/staffManage/staffManage.vue'
import deptManage from './views/public/deptManage/deptManage.vue'
import sectionContainer from './components/common/sectionContainer.vue'
import personalInfo from './views/public/personalInfo.vue'

Vue.use(VueResource);
Vue.use(ElementUi);
Vue.use(VueRouter);

Vue.prototype.user = {}

let arg =
    [{
        "children": [{
            "name": "部门1",
            "type": 0,
            "deptId": 28,
            "children": [{
                "name": "小部门",
                "type": 0,
                "deptId": 50,
                "children": [{
                    "name": "小部门的小职位",
                    "type": 1,
                    "deptId": 54
                }]
            }]
        }],
        "_id": "5ae97fcecbf71c4c80e399ca",
        "name": "公司",
        "deptId": 0,
        "type": 0,
        "nextId": 57,
        "__v": 0
    }]

const router = new VueRouter({
    routes: [
        {path: '/', components: {default: login}},
        {path: '/login', name: 'Login', components: login},
        {
            path: '/user', component: pageContainer, children: [
            {
                path: 'personnel_management',
                component: sectionContainer,
                children: [
                    {
                        path: 'staff_management',
                        name: 'staff_management',
                        component: staffManage
                    },
                    {
                        path: 'dept_management',
                        name: 'dept_management',
                        component: deptManage
                    }
                ]
            },
            {
                path: 'personalInfo',
                name: 'personalInfo',
                component: personalInfo
            }
        ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    let user = _global.user;
    let powerObj = _global.powerObj;
    let urlArr = to.path.split('/');
    let a = 1;
    let targetUrl = urlArr[urlArr.length - 1]
    if (powerObj[targetUrl] < user.powerLevel) {
        next()
    } else {
        next({ path: '/login' })
    }
})

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})