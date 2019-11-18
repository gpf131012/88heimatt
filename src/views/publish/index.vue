<template>
  <div class="publish">
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
  </div>
  <el-form ref="form"  :model="article" label-width="80px">
  <el-form-item label="标题">
    <el-input placeholder="文章标题" v-model="article.title"></el-input>
  </el-form-item>
 <el-form-item label="内容">
    <quillEditor
      ref="myQuillEditor"
      v-model="article.content"
      >
  </quillEditor>
 </el-form-item>
  <el-form-item label="封面">
    <el-radio-group v-model="article.cover.type">
      <el-radio :label="1">单图</el-radio>
      <el-radio :label="3">三图</el-radio>
      <el-radio :label="0">无图</el-radio>
      <el-radio :label="2">自动</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-image>
      <div slot="error" class="image-slot" >
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
   <el-form-item label="频道">
    <el-select  placeholder="请选择" v-model="article.channel_id">
      <el-option :label="channel.name"
      :value="channel.id"
      v-for="channel in channels" :key="channel.id"></el-option>
      <!-- <el-option label="区域二" value="beijing"></el-option> -->
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onsubmit(false)">发表</el-button>
    <el-button @click="onsubmit(true)">存入草稿</el-button>
  </el-form-item>
  </el-form>
</el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
// import { type } from 'os'
export default {
  name: 'PublishArticle',
  components: {
    quillEditor
  },
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      channels: []
    }
  },
  created () {
    this.loadChannels()
    // 添加和编辑都用这个组件，只有编辑在初始化的时候才需要加载文章内容
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  },
  methods: {
    onsubmit (draft) {
      if (this.$route.params.articleId) {
        this.updataArticle(draft)
      } else {
        this.addArtixle(draft)
      }
      // console.log('submit')
    },
    addArtixle (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err, '保存失败')
      })
    },
    updataArticle (draft) {
      this.$axios({
        method: 'PUT',
        url: `articles/${this.$route.params.articleId}`,
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('更新失败')
      })
    },
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '获取失败')
      })
    },
    loadArticle () {
      this.$axios({
        method: 'GET',
        url: `articles/${this.$route.params.articleId}`
      }).then(res => {
        this.article = res.data.data
      })
    }
  }
}
</script>

<style>

</style>
