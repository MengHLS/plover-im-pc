<template>
  <div class="">
    登录
  </div>
</template>
<script lang="ts" setup>
import {onBeforeMount} from 'vue'

import {useUserStore} from '@/store/modules/user'


const userStore = useUserStore();

onBeforeMount(() => {
  const userInfo = {
    username: 'admin',
    password: 'admin123',
    code: '16',
    uuid: '6d0c8d18b32c4fef803297787be9ec70'
  }
  userStore.auth().then(() => {
    window.api.loginSuccess()
  }).catch(() => {
    userStore.login(userInfo).then(() => {
      // 跳转到首页
      // 创建主窗口
      window.api.loginSuccess()
    })
  })
})
</script>

<style scoped lang="sass">

</style>