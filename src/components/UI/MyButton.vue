<template>
  <button class="btn">
    <slot> </slot>
  </button>
</template>

<script>
export default {
  name: 'my-button',
}
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  background: none;
  border: 1px solid teal;
  border-radius: 5px;
}
</style>
