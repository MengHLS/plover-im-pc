<template>
  <div class="message-panel full-height full-width">
    <template v-if="active && active.conversationId">
      <div class="header">
        <Avatar :src="active.avatar" :name="active.name" ></Avatar>
        <el-text type="info" truncated :size="'large'">{{ active.name }}</el-text>
      </div>
      <el-scrollbar class="panel">
        <div >
          <div v-for="message in messages" :key="message.id">
            <Message :message="message" :reverse="message.senderId === userId" />

          </div>
        </div>
      </el-scrollbar>

    </template>
    <Empty class="empty" v-else>

    </Empty>
  </div>
</template>

<script setup lang="ts">
import Empty from "@/components/empty/index.vue"
import {useConversationStore} from "@/store/modules/conversation";
import {computed, watch, onActivated} from "vue";
import {Conversation} from "@/models/Conversation";
import Avatar from '@/components/avatar/index.vue';
import Message from "@/layout/conversation/components/message/index.vue";
import {useMessageStore} from "@/store/modules/message";
import {useUserStore} from "@/store/modules/user";

const conversationStore = useConversationStore();
const messageStore = useMessageStore()
const userStore = useUserStore();
const userId = userStore.id;
const active:any = computed(() => {
  return conversationStore.active as unknown as Conversation;
});

const messages = computed(() => {
  return messageStore.messageMap.get(active.value.conversationId) || [];
})

const getData = ()=> {
  // Fetch data here
  //...
  messageStore.fetchMessages(active.value.conversationId)
}

watch(active, async ()=>{
  getData()
})

onActivated(() => {

})
</script>



<style scoped lang="sass">
.message-panel
  margin: 0
  .header
    height: 2rem
    padding: 0.5rem
  .panel
    height: calc(100% - 5rem)
    padding: 1rem

</style>