import axios from 'axios'

export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((part1, part2) => {
        return part1[state.selectedSort]?.localeCompare(
          part2[state.selectedSort]
        )
      })
    },
    searchSortedPost(state, getters) {
      return getters.sortedPosts.filter((post) => {
        return post.title.toLowerCase().includes(state.search.toLowerCase())
      })
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setIsLoading(state, value) {
      state.isLoading = value
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    },
    setSearch(state, search) {
      state.search = search
    },
    setPage(state, page) {
      state.page = page
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setIsLoading', true)
        setTimeout(async () => {
          const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts?',
            {
              params: {
                _page: state.page,
                _limit: state.limit,
              },
            }
          )
          commit(
            'setTotalPages',
            Math.ceil(response.headers['x-total-count'] / state.limit)
          )
          commit('setPosts', response.data)
          commit('setIsLoading', false)
        }, 1000)
      } catch (e) {
        commit('setIsLoading', false)
        alert('Ошибка')
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit('setPage', state.page + 1)
        setTimeout(async () => {
          const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts?',
            {
              params: {
                _page: state.page,
                _limit: state.limit,
              },
            }
          )
          commit(
            'setTotalPages',
            Math.ceil(response.headers['x-total-count'] / state.limit)
          )
          commit('setPosts', [...state.posts, ...response.data])
        }, 1000)
      } catch (e) {
        alert('Ошибка')
      }
    },
  },
  namespaced: true,
}
