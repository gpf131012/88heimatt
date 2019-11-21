<template>
  <div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>图片管理</span>
    <el-button style="float: right; padding: 3px 0" type="text">上传图片</el-button>
  </div>
   <div>
        <el-radio-group v-model="type" @change='onFind'>
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="收藏">收藏</el-radio-button>
        </el-radio-group>
      </div>
  <el-row :gutter="20">
  <el-col :xs="24" :sm="12" :md="4" v-for= "item in images" :key="item.id" >
    <el-card :body-style="{ padding: '0px' }">
      <img :src="item.url" class="image" height="150">
      <div style="padding: 14px;" class="img">
        <i :class="item.is_collected ? 'el-icon-star-off' : 'el-icon-star-on'"></i>
        <i class="el-icon-delete-solid"></i>
      </div>
    </el-card>
  </el-col>
</el-row>
</el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: [],
      type: '全部'
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    loadImages (isCollect = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: isCollect // 是否获取收藏图片
        }
      }).then(res => {
        console.log(res)
        this.images = res.data.data.results
      }).catch(err => {
        console.log(err)
        this.message.error('失败')
      })
    },
    onFind (value) {
      this.loadImages(value !== '全部')
    }
  }
}
</script>

<style lang="less" scopes>
 .img{
   display: flex;
   justify-content: center
}
</style>
