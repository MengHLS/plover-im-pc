<template>
  <pre class="text-message padding-10">{{ text.trim() }}</pre>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
    default: ''
  }
})
</script>

<style scoped lang="sass">
.text-message
  margin: 0
  white-space: pre-wrap
  font-family: unset
  font-size: unset
  background-color: #FFFFFF
  border-radius: 2px 4px 4px 4px

.reverse .text-message
  background-color: #0099FF
  border-top-left-radius: 4px
  border-top-right-radius: 2px
  color: #FFFFFF
</style>