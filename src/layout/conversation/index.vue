<template>
  <div class="container">
    <el-container class="container">
      <el-aside class="conversation">
        <div class="search">搜索栏</div>
        <div class="conversation-list">
          <div v-for="item in conversationList">

            <ConversationCard :conversation="item" :key="item.conversationId"></ConversationCard>
          </div>
        </div>
      </el-aside>
      <el-main>

      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import ConversationCard from "./components/conversation-card/index.vue";
import {useConversationStore} from "@/store/modules/conversation";
import {computed} from "vue";

defineOptions({
  name: 'Conversation',
})

const conversationStore = useConversationStore()

const conversationList = computed(() => conversationStore.conversations)

conversationStore.syncConversations()


</script>

<style lang="sass" scoped>
.container
  margin: 0
  padding: 0
  height: 100vh
  width: 24rem

  .conversation
    background-color: #1b1b1b
    width: 24rem

    .search
      height: 3rem
      padding: 0.5rem .5rem .5rem .5rem

    .conversation-list
      width: 100%
</style>