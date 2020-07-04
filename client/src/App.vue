<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <router-link to="/add">New Expense</router-link>

    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
// import ExpenseComponent from './components/ExpenseComponent.vue'

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
