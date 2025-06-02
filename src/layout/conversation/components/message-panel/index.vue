<template>
  <div class="message-panel full-height full-width">
    <template v-if="active && active.conversationId">
      <div class="header">
        <Avatar :src="active.avatar" :name="active.name"></Avatar>
        <el-text type="info" truncated :size="'large'">{{ active.name }}</el-text>
      </div>
      <el-scrollbar ref="refScrollbar" class="panel" @scroll="scrollHandle">
        <div ref="refInner" class="flex-item_f-1 padding-15">
          <!--          <div class="date margin-20-n">{{ key }}</div>-->
          <div class="message-wrap message" v-for="message in messages" :key="message.id">
            <Message :message="message" :reverse="message.senderId === userId"/>

          </div>
        </div>
      </el-scrollbar>
      <Editor></Editor>
    </template>
    <Empty class="empty" v-else>

    </Empty>
  </div>
</template>

<script setup lang="ts">
import Empty from "@/components/empty/index.vue"
import {useConversationStore} from "@/store/modules/conversation";
import {ref, nextTick, computed, watch, onActivated} from "vue";
import {Conversation} from "@/models/Conversation";
import Avatar from '@/components/avatar/index.vue';
import Message from "@/layout/conversation/components/message/index.vue";
import Editor from "@/layout/conversation/components/editor/index.vue"
import {useMessageStore} from "@/store/modules/message";
import {useUserStore} from "@/store/modules/user";

const conversationStore = useConversationStore();
const messageStore = useMessageStore()
const userStore = useUserStore();
const userId = computed(() => {
  return userStore.id
})
const loading = ref(false)
const finished = ref(false)
const scrollTop = ref(0)
const refScrollbar = ref()
const refInner = ref()

const active: any = computed(() => {
  return conversationStore.active as unknown as Conversation;
});

const messages = computed(() => {
  return messageStore.messageMap.get(active.value.conversationId) || [];
})

const getData = () => {
  // Fetch data here
  //...
  messageStore.fetchMessages(active.value.conversationId)
}

watch(active,
    async () => {
      await getData()
      await nextTick(() => {
        scrollToBottom()
        loading.value = false
      })
    }, {immediate: true})

watch(messages, () => {
  if (refScrollbar.value) {
    nextTick(() => {
      const difference = refInner.value.clientHeight - refScrollbar.value.wrapRef.clientHeight - refScrollbar.value.wrapRef.scrollTop
      if (difference < refScrollbar.value.wrapRef.clientHeight) {
        scrollToBottom()
      }
    })
  }
}, {deep: true})
const scrollHandle = async (scroll: any) => {
  scrollTop.value = scroll.scrollTop
  if (scroll.scrollTop < 1 && !loading.value && !finished.value) {
    loading.value = true
    // setTimeout(async () => {
    const height = refInner.value.clientHeight
    await getData()
    const top = refInner.value.clientHeight - height
    scrollTop.value = top
    refScrollbar.value.setScrollTop(top)
    // }, 1000)
  }

}
/**
 * 滚动条滚动到底部
 */
const scrollToBottom = () => {
  if (refInner.value) {
    const scrollTop = refInner.value.clientHeight - refScrollbar.value.wrapRef.clientHeight
    refScrollbar.value.setScrollTop(scrollTop)
  }
}
onActivated(() => {

})
</script>


<style scoped lang="sass">
.message-panel
  margin: 0

  .header
    height: 3rem
    padding: 0.5rem
    border-bottom: 1px solid gray

  .panel
    height: calc(100% - 20rem)
    padding: 1rem 1rem 0 1rem
    border-bottom: 1px solid gray

  .message-wrap + .message-wrap
    margin-top: 10px
</style>