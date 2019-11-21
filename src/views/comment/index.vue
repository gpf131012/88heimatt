<template>
  <div>
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>评论管理</span>
  </div>
  <el-table
      :data="articles"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="240">
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总品论数"
        width="120">
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数据">
      </el-table-column>
      <el-table-column
        label="评论状态">
        <template slot-scope="scope">
           <el-switch
          @change="onStatusChange(scope.row)"
          v-model="scope.row.comment_status"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
        <el-button @click="$router.push('/comment/' +scope.row.id)"> <i class="el-icon-edit"></i></el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-pagination
    background
    layout="prev, pager, next"
    :total="totalCount"
    @current-change='onchange'
    >
  </el-pagination>
</el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [],
      totalCount: 0,
      page: 1
    }
  },
  created () {
    this.loadArtiles()
  },
  components: {},
  props: {},
  methods: {
    loadArtiles (page = 1) {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          page,
          response_type: 'comment'
        }
      }).then(res => {
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
        console.log(res.data)
      }).catch(err => {
        console.log(err, '获取失败')
      })
    },
    onStatusChange (article) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: article.id.toString()
        },
        data: {
          allow_comment: article.comment_status
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: `${article.comment_status ? '启用' : '关闭'}成功`
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('操作失败')
      })
    },
    onchange (page) {
      this.page = page
      this.loadArtiles(page)
    }
  }

}
</script>

<style>

</style>
