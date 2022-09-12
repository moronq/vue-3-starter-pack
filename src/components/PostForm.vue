<template>
  <form @submit.prevent>
    <h3>Создание поста</h3>
    <my-input
      v-focus
      v-model="post.title"
      class="input"
      placeholder="Название"
    />
    <my-input v-model="post.body" class="input" placeholder="Описание" />
    <my-button class="createBtn" @click="createPost">Создать</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: '',
      }
    },
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
.input {
  margin-top: 10px;
}
.createBtn {
  align-self: flex-end;
  margin-right: 10px;
  margin-top: 10px;
}
</style>
