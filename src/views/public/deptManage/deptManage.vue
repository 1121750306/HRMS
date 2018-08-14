<template>
    <section id="deptWrap">
        <h2 id="title">部门岗位管理</h2>
        <section id="treeWrap">
            <el-row>
                <el-col :span="15">
                    <div class="custom-tree-container">
                        <el-tree
                                :data="tmpData"
                                :props="{label: 'name'}"
                                node-key="deptId"
                                ref="tree"
                                @node-click="nodeClick"
                                expand-on-click-node
                                :highlight-current="true"
                                :default-expanded-keys="[0]"
                                :expand-on-click-node="false"
                                :render-content="renderContent"
                                :indent="20">
                        </el-tree>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                </el-col>
            </el-row>
        </section>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                tmpData: [{
                    association_id: 1,
                    label: 'test',
                    children: [
                        {
                            association_id: 2,
                            label: 'test2',
                        },
                        {
                            association_id: 3,
                            label: 'test3',
                        }
                    ]
                }],
                maxID: '',
            }
        },
        methods: {
            appendDepartment(data, node) {
                if(data.type == 0){
                    this.$prompt('请输入<strong><span style="color:#ff7825">部门</span></strong>名', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true
                    }).then((input) => {
                        this.$http.post('/api/addDept', {
                            name: input.value,
                            type: 0,
                            parentId: data.deptId
                        }).then((res) => {
                            if (res.data.sign) {
                                this.$notify.success({title: '添加成功！', duration:1000});
                                this.tmpData = res.data.data;
                            } else {
                                this.$notify.error({title: '其他错误！', duration:1000,});
                            }
                        })
                    });
                } else {
                    this.$notify.error({
                        message:'岗位不应添加子项目',
                        duration:1000,
                    });
                }
            },
            appendPost(data, node) {
                console.log(data, node)
                if(data.type == 0){
                    this.$prompt('请输入<strong><span style="color:#ff7825">岗位</span></strong>名', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true
                    }).then((input) => {
                            this.$http.post('/api/addDept', {
                                name: input.value,
                                type: 1,
                                parentId: data.deptId
                            }).then((res) => {
                                if (res.data.sign) {
                                    this.$notify.success({title: '添加成功！', duration:1000});
                                    this.tmpData = res.data.data;
                                }
                                console.log(res)
                            })
                        }
                    );
                } else {
                    this.$notify.error({
                        message:'岗位无法添加子项目',
                        duration:1000,
                    });
                }
            },
            openDialog(node) {
                console.log('修改')
            },
            remove(data, node) {
                if (data.deptId === 0) {
                    this.$message({
                        message: '公司不能被删除',
                        type: 'warning',
                        duration: 1000
                    });
                } else {
                    this.$confirm('此操作将彻底删除该部门岗位, 是否继续?', '警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.post('/api/deleteDept', {
                            deptId: data.deptId
                        }).then((res) => {
                            if (res.data.sign) {
                                this.$notify.success({title: '删除成功！', duration:1000});
                                this.tmpData = res.data.data;
                            }
                            console.log(res)
                        })
                    })
                }
                console.log('删除')
            },
            edit(data, node) {
                this.$prompt('请输入修改后的<strong><span style="color:#ff7825">部门岗位</span></strong>名', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true
                })
            },
            renderContent(h, { node, data, store }) {
                return (
                    <span class="custom-tree-node">
                    <span>{node.label}</span>
                <span>
                <el-button type="text" size="medium" icon="el-icon-circle-plus-outline" on-click={ () => this.appendDepartment(data,node) }>部门</el-button>
                <el-button type="text" size="medium" icon="el-icon-circle-plus-outline" on-click={ () => this.appendPost(data,node) }>职位</el-button>
                <el-button type="text" size="medium" icon="el-icon-edit" on-click={ () => this.edit(data, node) }>编辑</el-button>
                <el-button type="text" size="medium" icon="el-icon-delete" on-click={ () => this.remove(data, node) }>删除</el-button>
                </span>
                </span>);
            }
        },
        created() {
            this.$http.get('/api/getDept')
                .then((res) => this.tmpData = res.data)
        }
    }
</script>

<style scoped>
    #treeWrap {
        margin-left: 20px;
    }

    #title {
        margin-bottom: 40px;
        margin-left: 20px;
        font-weight: 500;
        font-size: 1.3em;
    }
</style>
<style>
    #deptWrap {
        min-height: 500px;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    div.custom-tree-container .el-button--text{
        /*color:#fff;*/
    }
</style>