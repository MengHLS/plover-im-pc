<template>
  <div class="conversation-card">
    <el-row :gutter="4">
      <el-col :span="4">
        <Avatar :name="conversation.name" :src="avatar"></Avatar>
      </el-col>
      <el-col :span="20">
        <el-row class="full-width">
          <el-col :span="16" >
            <el-text class="text-name" type="primary" size="large" truncated>{{ conversation.conversationName }}</el-text>
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

const avatarStore = useAvatarStore()
const props = defineProps({
  conversation: {
    type: Object,
    required: true,
    conversationId: String,
    content: String,
    conversationName: String,
    timeStamp: Number,
    avatar: String
  },
})

const timeText = computed(() => {
  return "2024/07/14"
})

const avatar = computed(() => {
  const avatar = avatarStore.list.find(item => item.userId === props.conversation.conversationId);

  if (avatar) {
    return  avatar.userAvatar;
  } else {
    console.log(props.conversation.conversationId)
    return avatarStore.getUserAvatar(props.conversation.conversationId).userAvatar;
  }
})



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