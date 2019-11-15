<template>
  <div class="login">
      <el-card class="login-card">
          <div class="titel">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <!-- 绑定表单数据对象 -->
    <el-form style="margin-top:20px" :model="loginForm" :rules="loginRules" ref="myForm">
        <el-form-item prop="mobile">
            <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-input style="width:230px" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
            <el-button style="float:right" plain>获取验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
             <el-checkbox v-model="loginForm.checked">我同意<a href="" style="color:blue">用户协议</a>与<a href="" style="color:blue" >霸王条款</a></el-checkbox>
        </el-form-item>
        <el-form-item>
       <el-button style="width:100%" type="primary" @click="login">登录</el-button>
        </el-form-item>
    </el-form>

      </el-card>
      <!-- <div ref=""></div> -->
</div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      //   rule当前规范
      //   value当前表单项的值
      //   callback回调函数
      if (value) {
        callBack()
      } else {
        callBack(new Error('您必须同意我的霸王条款'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },
      loginRules: {
        mobile: [
          {
            required: true, message: '请输入手机号'
          }, {
            pattern: /^1[3456789]\d{9}$/, message: '请输入合法手机号'
          }
        ],
        code: [{
          required: true, message: '请输入您的验证码'
        }, {
          pattern: /^\d{6}$/, message: '请输入有效验证码'
        }],
        checked: [{ validator }]
      } }
  },
  methods: {
    login () {
      this.$refs.myForm.validate((isok) => {
        if (isok) {
        //   console.log('校验成功')
          this.$axios({
            url: '/authorizations',
            data: this.loginForm,
            method: 'post'
          }).then(result => {
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/')
          }).catch(() => {
            this.$message({
              message: '手机号或验证码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login{
    background-image: url(../../assets/img/login_bg.jpg);
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items:center;
    .login-card{
        width: 400px;
        height: 360px;
        .titel{
            text-align: center;
            img{
            height: 40px;
            }
        }
    }
}

</style>
