<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside">
        Aside
      </el-aside>
      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "app",
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