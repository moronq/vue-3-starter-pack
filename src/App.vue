<template>
  <div class="app">
    <post-form @create="createPost" />
    <post-list :posts="posts" @remove="removePost" />
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue'
import PostForm from '@/components/PostForm.vue'
export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [
        { id: 1, title: 'JavaScript', body: 'Очень умный пост про JavaScript' },
        { id: 2, title: 'TypeScript', body: 'Лучшие практики по TypeScript' },
        { id: 3, title: 'ReactJS', body: 'ReactJS для чайников' },
        {
          id: 4,
          title: 'VueJs',
          body: 'Зачем вообще нужен VueJS, когда есть ReactJS',
        },
      ],
      title: '',
      body: '',
    }
  },
  methods: {
    createPost(newPost) {
      this.posts.push(newPost)
    },
    removePost(post) {
      this.posts = this.posts.filter((el) => el.id !== post.id)
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}
.app {
  padding: 20px;
}
</style>
