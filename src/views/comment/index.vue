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
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
      </el-table-column>
    </el-table>
    <el-pagination
    layout="prev, pager, next"
    >
  </el-pagination>
</el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // tableData: [{
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   date: '2016-05-04',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1517 弄'
      // }, {
      //   date: '2016-05-01',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1519 弄'
      // }, {
      //   date: '2016-05-03',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1516 弄'
      // }]
      articles: []
    }
  },
  created () {
    this.loadArtiles()
  },
  components: {},
  props: {},
  methods: {
    loadArtiles () {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        this.articles = res.data.data.results
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
    }
  }

}
</script>

<style>

</style>
