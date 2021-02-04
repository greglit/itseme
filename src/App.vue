<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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

@font-face {
  font-family: "WhyteInktrapBold";
  src: local("WhyteInktrapBold"),   url(./assets/fonts/WhyteInktrap-Bold.ttf) format("truetype");
}

.inktrap {
  //font-family: WhyteInktrapBold, Helvetica, Arial, sans-serif;
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
  font-weight: 700;
}
</style>
