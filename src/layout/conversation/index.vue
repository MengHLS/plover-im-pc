<template>
  <div class="container full-height">
    <el-container class="container full-height full-width">
      <el-aside class="conversation full-height">
        <div class="search">搜索栏</div>
        <div class="conversation-list">
          <div v-for="item in conversationList">
            <ConversationCard :conversation="item" :key="item.conversationId" ></ConversationCard>
          </div>
        </div>
      </el-aside>
      <el-main class="main full-height">
        <MessagePanel></MessagePanel>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import ConversationCard from "./components/conversation-card/index.vue";
import MessagePanel from "./components/message-panel/index.vue";
import {useConversationStore} from "@/store/modules/conversation";
import {computed} from "vue";

defineOptions({
  name: 'Conversation',
})

const conversationStore = useConversationStore()

const conversationList = computed(() => conversationStore.conversations)



</script>

<style lang="sass" scoped>
.container
  margin: 0
  padding: 0

  .conversation
    width: 24rem

    .search
      height: 3rem
      padding: 0.5rem .5rem .5rem .5rem

    .conversation-list
      width: 100%
  .main
    padding: 0
</style>