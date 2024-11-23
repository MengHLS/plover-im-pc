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
    code: '36',
    uuid: '1084ad3991d143e0ba768f6dd36f8710'
  }

  userStore.login(userInfo).then(() => {
    console.log('login success')
    // 跳转到首页
    //创建主窗口
    window.api.loginSuccess()
  })
})
</script>

<style scoped lang="sass">

</style>