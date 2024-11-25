<template>
  <div class="login">
    <el-form ref="loginRef" :model="userInfo" :rules="loginRules" class="login-form">
      <el-form-item prop="username">
        <el-input
            v-model="userInfo.username"
            type="text"
            size="large"
            auto-complete="off"
            placeholder="账号"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            v-model="userInfo.password"
            type="password"
            size="large"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
            v-model="userInfo.code"
            size="large"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-checkbox v-model="userInfo.rememberMe" style="margin:0 0 25px 0;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
            :loading="loading"
            size="large"
            type="primary"
            style="width:100%;"
            @click.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>

import {useUserStore} from '@/store/modules/user'
import {getCodeImg} from "@/api/login";
import {ref, getCurrentInstance } from "vue";

const codeUrl = ref("");
const { proxy } = getCurrentInstance();

// 验证码开关
const captchaEnabled = ref(true);
// 注册开关
const register = ref(false);
const userInfo = ref({
  username: 'admin',
  password: 'admin123',
  code: '11',
  uuid: '9f25f80afb654ffd9a2806d15758ba77',
  rememberMe: false,
})
const loading = ref(false);


const loginRules = {
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
  code: [{ required: true, trigger: "change", message: "请输入验证码" }]
};


const userStore = useUserStore();
userStore.auth().then(() => {
  console.log("执行登录操作================================")
  window.api.loginSuccess()
}).catch(() => {
  //查询记住的用户名
  //查询记住的密码
})

function handleLogin() {
  userStore.login(userInfo.value).then(() => {
    // 跳转到首页
    // 创建主窗口
    window.api.loginSuccess()
  })
}
function getCode() {
  getCodeImg().then((res:any) => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      userInfo.value.uuid = res.uuid;
    }
  });
}

getCode()
</script>

<style scoped lang="sass">
.login
  display: flex
  justify-content: center
  align-items: center
  height: 100%
  background-size: cover

.title
  margin: 0px auto 30px auto
  text-align: center
  color: #707070


.login-form
  border-radius: 6px
  background: #ffffff
  width: 400px
  padding: 25px 25px 5px 25px
  .el-input
    height: 40px
    input
      height: 40px


  .input-icon
    height: 39px
    width: 14px
    margin-left: 0px


.login-tip
  font-size: 13px
  text-align: center
  color: #bfbfbf

.login-code
  width: 33%
  height: 40px
  float: right
  img
    cursor: pointer
    vertical-align: middle


.el-login-footer
  height: 40px
  line-height: 40px
  position: fixed
  bottom: 0
  width: 100%
  text-align: center
  color: #fff
  font-family: Arial
  font-size: 12px
  letter-spacing: 1px

.login-code-img
  height: 40px
  padding-left: 12px

</style>