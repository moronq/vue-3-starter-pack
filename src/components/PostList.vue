<template>
  <h3>Список постов</h3>
  <ul v-if="posts.length > 0">
    <post-item
      v-for="post in posts"
      :post="post"
      :key="post.id"
      @remove="$emit('remove', post)"
    />
  </ul>
  <h4 v-else>Список постов пуст</h4>
</template>

<script>
import PostItem from './PostItem.vue'
export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  emits: ['remove'],
}
</script>

<style scoped></style>
