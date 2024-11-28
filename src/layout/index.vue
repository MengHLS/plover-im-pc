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
import {useMessageStore} from "@/store/modules/message";

const userStore = useUserStore()
const conversationStore = useConversationStore()
const messageStore = useMessageStore()

const user = computed(() => {
  const {id, name, avatar} = userStore
  return {id, name, avatar}
})

window.api.onReceiveMessage((data: SocketDTO) => {
  conversationStore.receiveMessage(data)
})

userStore.setInfo().then(()=>{
  messageStore.syncMessage()
  conversationStore.syncConversations()
})

</script>



<style lang="sass" scoped>
$size: 43px
.common-layout
  width: 100vw
  height: 100vh
  background-image: linear-gradient(45deg,#EAF1FF,#FFF3FF,#E0EBFF, #D6E9FF)

  .aside
    padding: 0.5rem
    width: 4rem

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