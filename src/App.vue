<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Cards</router-link> |
      <router-link to="/CrossZero">Cross-zero</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  width: 100%;
  height: 100%;
}
#nav {
  font-size: 20px;
}
#nav a {
  text-decoration: none;
  padding: 10px;
}
#nav a:hover{
  color: #03ac9e;
  background: beige;
  opacity: 0.6;
  padding: 10px;
  border-radius: 100px;
}
#nav a.router-link-exact-active {
  color: #1adfce;
}
</style>
