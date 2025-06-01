<template>
  <div class="editor">
    <div class="tools">

    </div>
    <div class="input-area">
      <el-input type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                v-model = "text"
                resize="none"/>
      <div>
        <el-icon class="cursor-pointer" :size="20" @click="textSendHandle">
          <Promotion/>
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {Promotion} from "@element-plus/icons-vue";

const text:any = null
const textSendHandle = () => {
  console.log('send text');
};
</script>

<style scoped lang="sass">
.editor
  .tools
    height: 2.5rem
  .input-area
    height: calc(100% - 2.5rem)
</style>