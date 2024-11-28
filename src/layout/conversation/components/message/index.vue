<template>
  <div class="message flex" :class="reverse ? 'reverse':'' ">
    <Avatar :name="message.senderName" :src="avatar" :size="40"></Avatar>
    <div class="wrap flex-item_f-1">
      <div class = "info flex">

      </div>
      <div class="content">
        <div class="text">{{message.content}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from "@/components/avatar/index.vue"
import {computed} from "vue";
import {useAvatarStore} from "@/store/modules/userAvatarStore";

const avatarStore = useAvatarStore()
const props = defineProps({
  message:{
    type: Object,
    required: true,
  },
  reverse:{
    type: Boolean,
    default: false,
  }
})

const avatar = computed(()=>{
  let avatar = avatarStore.list.find(item => item.userId === props.message.senderId);

  if (avatar === null || avatar === undefined) {
    avatarStore.getUserAvatar(props.message.senderId).then(res => {
      return  res.userAvatar
    });
  } else {
    return avatar.userAvatar;
  }})
</script>

<style scoped lang="sass">
.message
  .avatar
    flex-shrink: 0

.message.reverse
    flex-direction: row-reverse
    .wrap
      align-items: flex-end
</style>