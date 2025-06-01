<template>
  <div class="message flex" :class="reverse ? 'reverse':'' ">
    <Avatar class="flex-item_d-column avatar" :name="message.senderName" :src="avatar" :size="40"></Avatar>
    <div class="wrap flex-item_f-1  margin-n-10 flex_d-column flex_a_i-flex-start">
      <div class="info flex" :class="hidden ? 'hidden':''">
        <el-text type="info">{{ message.createTime }}</el-text>
      </div>
      <div class="message-wrap flex" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <div class="message-row flex">
          <TextMessage :text="message.content"></TextMessage>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from "@/components/avatar/index.vue"
import {computed, ref} from "vue";
import {useAvatarStore} from "@/store/modules/userAvatarStore";
import TextMessage from './components/text-message/index.vue'

const avatarStore = useAvatarStore()
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
  reverse: {
    type: Boolean,
    default: false,
  }
})
const avatar = computed(() => {
  let avatar = avatarStore.list.find(item => item.userId === props.message.senderId);

  if (avatar === null || avatar === undefined) {
    avatarStore.getUserAvatar(props.message.senderId).then(res => {
      return res.userAvatar
    });
  } else {
    return avatar.userAvatar;
  }
})
const timer = ref<ReturnType<typeof setTimeout> | null>(null);
const hidden = ref(true)

const handleMouseEnter = () => {
  if (timer.value){
    clearTimeout(timer.value)
    timer.value = null
  }
  timer.value = setTimeout(() => {
    hidden.value = false
  }, 1500)
}

const handleMouseLeave = () => {
  if (timer.value){
    clearTimeout(timer.value)
    timer.value = null
  }
  hidden.value = true
}
</script>

<style scoped lang="sass">
.message
  padding-right: 40px
  padding-left: 0

  .avatar
    margin-top: 20px
    flex-shrink: 0

  .wrap
    .message-wrap
      max-width: 100%

    &:hover .email, &:hover .time
      display: inline

.message.reverse
  padding-right: 0
  padding-left: 40px
  flex-direction: row-reverse

  .wrap
    align-items: flex-end

  .info, .message-wrap, .message-row
    flex-direction: row-reverse

.hidden
  visibility: hidden
</style>