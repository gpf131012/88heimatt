<template>
  <div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>图片管理</span>

    <el-upload
    style="float: right; padding: 3px 0"
      class="upload-demo"
      action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
      :headers="{uplodHeaders}"
      name="image"
      :on-success="onUpload"
      >
      <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
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
        <i :class="item.is_collected ? 'el-icon-star-off' : 'el-icon-star-on'"
        @click="onCollect(item)"
        ></i>
        <i class="el-icon-delete-solid" @click="onDelect(item)"></i>
      </div>
    </el-card>
  </el-col>
</el-row>
</el-card>
  </div>
</template>

<script>
const token = window.localStorage.getItem('user-token')
export default {
  data () {
    return {
      images: [],
      type: '全部',
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      }
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
    },
    // 收藏和取消收藏
    onCollect (item) {
      this.$axios({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        item.is_collected = !item.is_collected
      }).catch(err => {
        this.$message.error(err, '操作失败')
      })
    },
    // 删除
    onDelect (item) {
      this.$confirm('你确定要删除吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'DELETE',
          url: `/user/images/${item.id}`
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.loadImages(this.type !== '全部')
        }).catch(err => {
          this.message.error(err, '删除失败')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // onUpload 组件上传成果触发的事件
    onUpload () {
      this.loadImages(this.type !== '全部')
    }
  }
}
</script>

<style lang="less" scoped>
 .img{
   display: flex;
   justify-content: center
}
</style>
