<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-button @click="openModal">Создать пост</my-button>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list :posts="posts" @remove="removePost" v-if="!isLoading" />
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue'
import PostForm from '@/components/PostForm.vue'
import MyDialog from './components/UI/MyDialog.vue'
import axios from 'axios'
import MyButton from './components/UI/MyButton.vue'
export default {
  components: {
    PostList,
    PostForm,
    MyDialog,
    MyButton,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isLoading: false,
    }
  },
  methods: {
    createPost(newPost) {
      this.posts.push(newPost)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter((el) => el.id !== post.id)
    },
    openModal() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        this.isLoading = true
        setTimeout(async () => {
          const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts?_limit=10'
          )
          this.posts = response.data
          this.isLoading = false
        }, 1000)
      } catch (e) {
        this.isLoading = false
        alert('Ошибка')
      }
    },
  },
  mounted() {
    this.fetchPosts()
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
