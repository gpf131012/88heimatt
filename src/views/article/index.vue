<template>
  <div class="article">
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>全部图文</span>
  </div>
  <!-- 卡片内容 -->
  <el-form ref="form">
  <el-form-item label="文章状态" >
    <!-- <el-input ></el-input> -->
    <el-radio-group v-model="filterForm.status">
      <el-radio   :label="null">全部</el-radio>
      <el-radio   label="0">草稿</el-radio>
      <el-radio   label="1">待审核</el-radio>
      <el-radio   label="2">审核通过</el-radio>
      <el-radio   label="3">审核失败</el-radio>
      <el-radio   label="4">已删除</el-radio>

  </el-radio-group>
  </el-form-item>
  <el-form-item label="频道列表">
    <el-select  placeholder="请选择" v-model="filterForm.channel_id">
      <el-option label="所有频道" :value="null"></el-option>
      <el-option :label="channel.name"
      :value="channel.id"
      v-for="channel in channels"
      :key="channel.id"></el-option>
      <!-- <el-option label="区域二" value="beijing"></el-option> -->
    </el-select>
  </el-form-item>
  <el-form-item label="时间选择">
    <el-date-picker
      v-model="rangeDate"
      type="daterange"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd">
    </el-date-picker>
  </el-form-item>
   <el-button type="primary"
    icon="el-icon-search"
    @click='loaadArticles(1)'
    >搜索</el-button>
  </el-form>
</el-card>
<el-card>
<div slot="header" class="clearfix">
<span>共找到{{totalCount}}条符合条件的内容</span>
</div>

<el-table
      :data="articlesL"
      style="width: 100%"
       v-loading="loading">
      <el-table-column
        prop="date"
        label="封面"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.cover.images[0]" alt="" width="30%">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope"><!-- 声明slot-scope=sxope  -->
          <!-- <span>{{l}}</span> -->
          <el-tag :type="articleStatusL[scope.row.status].type">
            {{articleStatusL[scope.row.status].label}}</el-tag>

        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布日期">
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
        <template slot-scope="scope">
        <!-- <i class="el-icon-edit" style="margin-right:8 px">编辑</i> -->
         <el-link icon="el-icon-edit" @click="$router.push('/publish/' + scope.row.id)">编辑</el-link>
        <!-- <i class="el-icon-delete">删除</i> -->
         <el-link icon="el-icon-delet"  class="el-icon-delete" @click="onDelect(scope.row.id)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
</el-card>
<!-- 分页 -->
<!-- 默认按照10条每页划分 -->
<el-pagination
  background
  layout="prev, pager, next"
  :total="totalCount"
  :disabled="loading"
  @current-change="onPageChange">
</el-pagination>
  </div>
</template>

<script>
export default {
  // name: 'a',
  data () {
    return {
      filterForm: {
        status: null,
        channel_id: null

        // begin_pubdate: '',
        // end_pubdate: ''

      },
      rangeDate: [],
      articlesL: [], // 空数组
      articleStatusL: [
        {
          type: '',
          label: '草稿'
        },
        {
          type: 'success',
          label: '待审核'
        },
        {
          type: 'info',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      totalCount: 0,
      loading: true,
      channels: [],
      page: 1 // 频道列表
    }
  },
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  methods: {
    // page用于传递
    loadArticles (page = 1) {
      this.loading = true
      // const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        // headers: {
        // // 名字：值
        // // 后端把token放到请求头中，使用的名字Authorization
        // // token要求格式Bearer 用户token
        //   Authorization: `Bearer ${token}`
        // },
        params: {
          page,
          per_page: 10,
          status: this.filterForm.status, // 文章状态
          channel_id: this.filterForm.channel_id, // 频道
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始时间
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 结束时间
        }
      }).then(res => {
        this.articlesL = res.data.data.results
        // 更新总记录数
        this.totalCount = res.data.data.total_count
      }).catch(err => {
        console.log(err, '失败')
      }).finally(() => {
        this.loading = false
      })
    },
    onPageChange (page) {
      // console.log(page)
      this.page = page
      this.loadArticles(page)
    },
    loaadArticles (page) {
      this.loadArticles(page)
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
    onDelect (articleId) {
      this.$axios({
        method: 'delete',
        url: `/articles/${articleId}`
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // }
      }).then(res => {
        this.loadArticles(this.page)
      }).catch(err => {
        console.log(err, '删除失败')
      })
    }
  }
}
</script>

<style>

</style>
