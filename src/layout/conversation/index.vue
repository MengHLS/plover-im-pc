<script lang="ts" setup>
import ConversationCard from "./components/conversation-card/index.vue";


defineOptions({
  name: 'Conversation',
})


</script>

<template>
  <div class="container">
    <el-container>
      <el-aside>
        <div>搜索栏</div>
        <div>列表</div>
        <ConversationCard></ConversationCard>
      </el-aside>
      <el-main>

      </el-main>
    </el-container>
  </div>
</template>

<style scoped>

</style>