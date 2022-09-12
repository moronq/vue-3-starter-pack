<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-focus v-model="search" placeholder="search..." />
    <div class="app__btns">
      <my-button @click="openModal">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      :posts="searchSortedPost"
      @remove="removePost"
      v-if="!isLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': page === pageNumber,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue'
import PostForm from '@/components/PostForm.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import axios from 'axios'
import MyButton from '@/components/UI/MyButton.vue'
import MySelect from '@/components/UI/MySelect.vue'
import MyInput from '@/components/UI/MyInput.vue'
export default {
  components: {
    PostList,
    PostForm,
    MyDialog,
    MyButton,
    MySelect,
    MyInput,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isLoading: false,
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
      ],
      search: '',
      page: 1,
      limit: 10,
      totalPages: 0,
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
    // changePage(pageNumber) {
    //   this.page = pageNumber
    // },
    async fetchPosts() {
      try {
        this.isLoading = true
        setTimeout(async () => {
          const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts?',
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
          )
          this.totalPages = Math.ceil(
            response.headers['x-total-count'] / this.limit
          )
          this.posts = response.data
          this.isLoading = false
        }, 1000)
      } catch (e) {
        this.isLoading = false
        alert('Ошибка')
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        setTimeout(async () => {
          const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts?',
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
          )
          this.totalPages = Math.ceil(
            response.headers['x-total-count'] / this.limit
          )
          this.posts = [...this.posts, ...response.data]
        }, 1000)
      } catch (e) {
        alert('Ошибка')
      }
    },
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((part1, part2) => {
        return part1[this.selectedSort]?.localeCompare(part2[this.selectedSort])
      })
    },
    searchSortedPost() {
      return this.sortedPosts.filter((post) => {
        return post.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // },
  },
}
</script>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
  gap: 10px;
}
.page {
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 10px;
}
.current-page {
  border: 2px solid teal;
}
</style>
