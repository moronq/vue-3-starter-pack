<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Все посты</my-button>
      <my-button @click="$router.push('/about')" style="margin-left: 20px"
        >О приложении</my-button
      >
      <my-button @click="$router.push('/store')">Store</my-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.navbar {
  height: 50px;
  background: lightblue;
  box-shadow: 2px 2px 4px lightblue;
  display: flex;
  align-items: center;
  padding: 15px 20px;
}
.navbar__btns {
  margin-left: auto;
}
</style>
