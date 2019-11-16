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
      <el-radio label="0">全部</el-radio>
      <el-radio   label="1">草稿</el-radio>
      <el-radio   label="2">待审核</el-radio>
      <el-radio   label="3">审核通过</el-radio>
      <el-radio   label="4">审核失败</el-radio>
  </el-radio-group>
  </el-form-item>
  <el-form-item label="频道列表">
    <el-select  placeholder="请选择" v-model="filterForm.channel_id">
      <el-option label="频道一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="时间选择">
    <el-date-picker
      v-model="rangeDate"
      type="daterange"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
  </el-form>
</el-card>
<el-card>
<div slot="header" class="clearfix">
<span>共找到59806条符合条件的内容</span>
</div>

<el-table
      :data="articlesL"
      style="width: 100%">
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
        <template slot-scope="scope">
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
        <template>
        <i class="el-icon-edit"></i>

        <i class="el-icon-delete"></i>
        </template>
      </el-table-column>
    </el-table>
</el-card>

  </div>
</template>

<script>
export default {
  // name: 'a',
  data () {
    return {
      filterForm: {
        suatus: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''

      },
      rangeDate: '',
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
      ]
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: {
        // 名字：值
        // 后端把token放到请求头中，使用的名字Authorization
        // token要求格式Bearer 用户token
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.articlesL = res.data.data.results
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
