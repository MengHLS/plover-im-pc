<template>

</template>
<script setup lang="ts">
import {computed} from 'vue'
import Avatar from "@/components/avatar/index.vue";
import {useUserStore} from '@/store/modules/user'
import {messageStore} from '@/store/modules/message'
import {ChatRound} from "@element-plus/icons-vue";
import {ACTION_TYPE} from "@/utils/enums/ActionType";
import {getToken} from "@/utils/auth";
import {SocketDTO} from "@/models/SocketDTO";
import {useConversationStore} from '@/store/modules/conversation'

const userStore = useUserStore();
const conversationStore = useConversationStore()
const msgStore = messageStore()
if (userStore.isLogin) {
  userStore.afterLogin().then(() => {
        init()
      }
  )
}

function init() {
  msgStore.syncMessage()
  const data = {
    "action": ACTION_TYPE.LOGIN,
    "data": {
      "token": getToken(),
      "deviceType": 1,
      "osType": 3,
    }
  }
  window.api.init(data).then(() => {

  })
}

</script>

