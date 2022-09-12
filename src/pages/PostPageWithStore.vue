<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
      :model-value="search"
      @update:model-value="setSearch"
      v-focus
      placeholder="search..."
    />
    <div class="app__btns">
      <my-button @click="openModal">Создать пост</my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
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
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue'
import PostForm from '@/components/PostForm.vue'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearch: 'post/setSearch',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      loadMorePosts: 'post/loadMorePosts',
    }),
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
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isLoading: (state) => state.post.isLoading,
      selectedSort: (state) => state.post.selectedSort,
      sortOptions: (state) => state.post.sortOptions,
      search: (state) => state.post.search,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      searchSortedPost: 'post/searchSortedPost',
    }),
  },
  watch: {},
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
