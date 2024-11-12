<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside">
        <Avatar :name="user.name" :src="user.avatar" :size="43"></Avatar>
      </el-aside>
      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import {computed} from 'vue'
import Avatar from "@/components/avatar/index.vue";
import {useUserStore} from '@/store/modules/user'


const userStore = useUserStore();
const user = computed(()=>{
  const { id, name, avatar  } = userStore
  return { id, name, avatar}
})
</script>


<style scoped>
.common-layout{
  width: 100vh;
  height: 100vw;
}
.common-layout .aside{
  padding: 1rem;
  width: 75px;
}
.common-layout .main{
  width: calc(100vw - 15px);
  height: 100vh;
}
</style>