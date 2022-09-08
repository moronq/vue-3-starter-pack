<template>
  <li class="post">
    <div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <div class="postBtns">
      <my-button @click="$emit('remove', post)">Удалить</my-button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  emits: ['remove'],
}
</script>

<style scoped>
.post {
  border: 1px solid teal;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
