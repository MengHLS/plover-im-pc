<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="50px">
        Aside
      </el-aside>
      <el-main>

      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "app"
})
</script>


<style scoped>
.common-layout{
  width: 100%;
  height: 100%;
  background-color: black;
}
</style>