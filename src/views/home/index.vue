<template>
<el-container>
  <el-aside>左侧</el-aside>

  <el-container>
    <el-header>
      头部
    </el-header>
    <!-- 中间区域 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
// import HelloWorld from '@components/HelloWorld.vue'
export default {
  name: 'home',
  components: {

  }
}
</script>

<style>

</style>
