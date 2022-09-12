<template>
  <h3>Список постов</h3>
  <ul v-if="posts.length > 0">
    <transition-group name="list">
      <post-item
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </ul>
  <h4 v-else>Список постов пуст</h4>
</template>

<script>
import PostItem from './PostItem.vue'
import MyInput from './UI/MyInput.vue'
export default {
  components: { PostItem, MyInput },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  emits: ['remove'],
}
</script>

<style scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.list-move {
  transition: transform 0.8s ease;
}
</style>
