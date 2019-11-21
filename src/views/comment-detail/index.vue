<template>
  <div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>评论详情列表</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <el-table
      :data="comments"
      style="width: 100%">
      <el-table-column
        label="头像"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.aut_photo" width="70px" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="评论内容"
        width="180">
      </el-table-column>
      <el-table-column
        label="点赞">
        <template slot-scope="scope">
          {{scope.row.is_liking ===1 ? '已赞' : '无赞'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="like_count"
        label="点赞数量">
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="点赞发布日期">
         <!-- <template slot-scope="scope">
           {{scope.row.pubdate | dateFormat}}
        </template> -->
      </el-table-column>
      <el-table-column
        label="是否推荐">
        <template slot-scope="scope">
        <el-switch
              v-model="scope.row.is_top"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onTop(scope.row)">
            </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="reply_count"
        label="回复数量">
      </el-table-column>
    </el-table>
</el-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      comments: []
    }
  },
  // 路由组件传参
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  // 实例选项：过滤器
  // 全局 任何组件都可以使用
  // 局部，只能当前使用
  // 用于日期格式化处理
  // 过滤器可以直接在模板中使用
  // 调用方法： {{ 数据 | 过滤器函数}}
  // filters: {
  //   dateFormat (value) {
  //     return moment(value).format('YYYY-MM-DD')
  //   }
  // },
  created () {
    this.loadcomments()
  },
  methods: {
    loadcomments () {
      this.$axios({
        method: 'GET',
        url: '/comments',
        params: {
          type: 'a',
          // 获取路由参数第二种方式把路由参数映射到
          // source: this.$route.params.articleId
          source: this.articleId
        },
        data: {
          allow_comment: true
        }
      }).then(res => {
        // console.log(res)
        const comments = res.data.data.results
        comments.forEach(item => {
          item.pubdate = moment(item.pubdate).format('YYYY-MM-DD')
        })
        this.comments = comments
      }).catch(err => {
        console.log(err)
        this.$message.error('获取失败')
      })
    },
    onTop (comment) {
      this.$axios({
        method: 'PUT',
        url: `/comments/${comment.com_id}/sticky`,
        data: {
          sticky: comment.is_top
        }
      }).then(res => {
        this.$message('操作成功')
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
