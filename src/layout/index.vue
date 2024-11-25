<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside">
        <div class="center-flex">
          <Avatar :name="user.name" :src="user.avatar" :size="36"></Avatar>
        </div>
        <div class="aside-button center-flex">
          <el-icon :size="28" color="#c9cacb">
            <ChatRound/>
          </el-icon>
        </div>
        <div class="aside-button center-flex">
          <el-icon :size="28" color="#c9cacb">
            <User/>
          </el-icon>
        </div>
      </el-aside>
      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>
export default defineComponent({
name: "index"
})
<script lang="ts" setup>

import {ChatRound} from "@element-plus/icons-vue";
import Avatar from "@/components/avatar/index.vue";
import {computed} from "vue";
import {useUserStore} from '@/store/modules/user'
import {SocketDTO} from "@/models/SocketDTO";
import {useConversationStore} from "@/store/modules/conversation";

const userStore = useUserStore()
const conversationStore = useConversationStore()

const user = computed(() => {
  const {id, name, avatar} = userStore
  return {id, name, avatar}
})

window.api.onReceiveMessage((data: SocketDTO) => {
  conversationStore.receiveMessage(data)
})
</script>



<style lang="sass" scoped>
$size: 43px
.common-layout
  width: 100vw
  height: 100vh

  .aside
    padding: 0.5rem
    width: 4rem
    background-color: #1c1d1d

    .aside-button
      margin: 0.5rem 0
      padding: 0.5rem 0

      &:hover
        color: #505050

      .icon-info
        color: #c9cacb

  .main
    width: calc(100vw - 4rem)
    height: 100vh
    padding: 0


</style>