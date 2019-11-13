<template>
  <div class="login">
      <el-card class="login-card">
          <div class="titel">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
    <el-form style="margin-top:20px">
        <el-form-item>
            <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input style="width:230px" placeholder="请输入验证码"></el-input>
            <el-button style="float:right" plain>获取验证码</el-button>
        </el-form-item>
        <el-form-item>
             <el-checkbox>我同意<a href="" style="color:blue">用户协议</a>与<a href="" style="color:blue">霸王条款</a></el-checkbox>
        </el-form-item>
        <el-form-item>
       <el-button style="width:100%" type="primary">登录</el-button>
        </el-form-item>
    </el-form>

      </el-card>
</div>
</template>

<script>
export default {

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
