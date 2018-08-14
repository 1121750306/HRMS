<template>
    <el-menu
            class="el-menu-vertical-demo"
            background-color="rgba(0,0,0,0)"
            text-color="#fff"
            active-text-color="#0d1823"
            v-bind:unique-opened='true'
            :router="true">
        <template v-for="(item, index) in asideGroup[powerLevel]">
            <template v-if="item.children[0]">
                <el-submenu :index="item.index">
                    <template slot="title"><i :class="item.icon" style="color:#fff"></i><span>{{item.title}}</span>
                    </template>
                    <el-menu-item
                            :index="child.index"
                            v-for="(child, i) in item.children"
                            :key="i"
                            :route="{path: child.path}">
                        {{ child.title }}
                    </el-menu-item>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.index" :route="{path: item.path}">
                    <i :class="item.icon" style="color:#fff"></i><span>{{item.title}}</span>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>

<script>
    export default{
        props: {
            powerLevel: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                asideGroup: [
                    [
                        {
                            title: '个人信息',
                            index: '1',
                            icon: 'el-icon-document',
                            path: '/user/personalInfo',
                            children: []
                        }
                    ],
                    [
                        {
                            title: '个人信息',
                            index: '1',
                            icon: 'el-icon-document',
                            path: '/user/personalInfo',
                            children: []
                        },
                        {
                            title: '人事管理',
                            index: '2',
                            icon: 'el-icon-setting',
                            path: '',
                            children: [
                                {
                                    title: '员工管理',
                                    index: '2-4',
                                    path: '/user/personnel_management/staff_management',
                                }
                            ]
                        },
                        {
                            title: '考勤管理',
                            index: '3',
                            icon: 'el-icon-view',
                            path: '',
                            children: [
                                {
                                    title: '签到签退',
                                    index: '3-1',
//                                path:'/user/attendance_management/clock_in',
                                },
                                {
                                    title: '请假查看',
                                    index: '3-2',
//                                path:'/user/attendance_management/leave',
                                }
                            ]
                        },
                    ],
                    [
                        {
                            title: '个人信息',
                            index: '1',
                            icon: 'el-icon-document',
                            path: '/user/personalInfo',
                            children: []
                        },
                        {
                            title: '人事管理',
                            index: '2',
                            icon: 'el-icon-setting',
                            path: '',
                            children: [
                                {
                                    title: '架构管理',
                                    index: '2-2',
                                    path: '/user/personnel_management/dept_management',
                                },
                                {
                                    title: '员工管理',
                                    index: '2-4',
                                    path: '/user/personnel_management/staff_management',
                                }
                            ]
                        },
                        {
                            title: '考勤管理',
                            index: '3',
                            icon: 'el-icon-view',
                            path: '',
                            children: [
                                {
                                    title: '签到签退',
                                    index: '3-1',
//                                    path: '/user/attendance_management/clock_in',
                                },
                                {
                                    title: '请假查看',
                                    index: '3-2',
//                                    path: '/user/attendance_management/leave',
                                }
                            ]
                        }
                    ]
                ]
            }
        },
        mounter() {
            if (this.powerLevel === 1) {
                this.asideGroup = JSON.parse(JSON.stringify(this.asideGroup1))
            } else if (this.powerLevel === 2) {
                this.asideGroup = JSON.parse(JSON.stringify(this.asideGroup2))
            }
        }
    }
</script>

<style scoped>
    .el-menu {
        border: 0;
        padding: 15px;
        /*font-weight: 600;*/
    }
</style>