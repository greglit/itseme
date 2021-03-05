<template>
  <div id="app">
    <home/>
  </div>
</template>

<script>
import Home from './views/Home.vue'

export default {
  components: {
    Home,
  }
}
</script>

<style lang="scss">
//@import './assets/styles/custom.scss';
@import '../node_modules/bootstrap/scss/bootstrap';
@import '../node_modules/bootstrap-vue/src/index.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,body {
  background-color: whitesmoke;
}

html {
  font-size: 1rem;
}

@include media-breakpoint-up(sm) {
  html {
    font-size: 1.2rem;
  }
}



@font-face {
  font-family: "YgroBook";
  src: local("YgroBook"),   url(./assets/fonts/YgroSansBeta-Book.otf) format("opentype");
}

.inktrap {
  font-family: YgroBook, Helvetica, Arial, sans-serif;
}
</style>
