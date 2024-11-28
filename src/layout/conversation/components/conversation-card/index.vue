<template>
  <div class="conversation-card"

       @click="clickHandle">
    <el-row :gutter="4">
      <el-col :span="4">
        <Avatar :name="conversation.name" :src="conversation.avatar"></Avatar>
      </el-col>
      <el-col :span="20">
        <el-row class="full-width">
          <el-col :span="16">
            <el-text class="text-name" type="primary" size="large" truncated>{{ conversation.name }}</el-text>
          </el-col>
          <el-col :span="8">
            <el-text class="text-time-text" type="info" truncated>{{ timeText }}</el-text>
          </el-col>
        </el-row>
        <el-row class="content">
          <el-text type="info" truncated>{{ conversation.content }}</el-text>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>


<script lang="ts" setup>
import Avatar from '@/components/avatar/index.vue';
import {computed} from "vue";
import {useAvatarStore} from "@/store/modules/userAvatarStore";
import {useConversationStore} from "@/store/modules/conversation";
import {Conversation} from "@/models/Conversation";

const avatarStore = useAvatarStore()
const conversationStore = useConversationStore()

const props = defineProps({
  conversation: {
    type: Object,
    required: true,
  },
})

const timeText = computed(() => {
  return "2024/07/14"
})

const active = computed({
  get: () => conversationStore.active || {},
  set: (val: Conversation) => conversationStore.setActive(val)
})
const clickHandle = () => {
  active.value = props.conversation as Conversation
}

const setAvatar = () => {
  let avatar = avatarStore.list.find(item => item.userId === props.conversation.conversationId);

  if (avatar === null || avatar === undefined) {
    avatarStore.getUserAvatar(props.conversation.conversationId).then(res => {
    props.conversation.avatar = res.userAvatar
    });
  } else {
    props.conversation.avatar = avatar.userAvatar;
  }
}

setAvatar()
</script>


<style lang="sass" scoped>
.conversation-card
  padding: 0.5rem
  width: calc(100% - 1rem)

  &:hover
    background-color: #393939

  .content
    margin: 0.5rem 0.5rem 0.5rem 0
    width: 100%


</style>