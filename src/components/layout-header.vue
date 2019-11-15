<template>
  <!-- 头部组件 -->
  <el-row type='flex' justify="space-between">
      <el-col :span="8" class="left">
          <i class="el-icon-s-fold"></i>
          <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span="3" class="right">
          <img src="../assets/img/avatar.jpg" alt="">
          <el-dropdown trigger="click">
               <span>觞儬</span>
               <el-dropdown-menu slot="dropdown">
                   <el-dropdown-item>账户信息</el-dropdown-item>
                   <el-dropdown-item>git信息</el-dropdown-item>
                   <el-dropdown-item @click.native="onlogin">退出</el-dropdown-item>
                <!-- 给组件注册一个原生事件，需要加native -->
               </el-dropdown-menu>
          </el-dropdown>
      </el-col>
  </el-row>
</template>

<script>
export default {

  methods: {
    onlogin () {
      this.$confirm('确认退出吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.left{
    display: flex;
    align-items: center;
    i{
        font-size: 24px;
    }
    span{
        margin-left: 4px;
    }
}
.right{
    display: flex;
    align-items: center;
    img{
        border-radius:50%;
        width: 40px;
    }
}
</style>
