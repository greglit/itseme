<template>
  <div class="home">
    <b-container fluid>
      <h1 class="text-left inktrap display-1">Hi, I'm Gregor!</h1>
      <h1 class="text-left inktrap display-4">Before I tell you something about me, I'd like to encourage you to make Your own mark on my site.</h1>
      <h1><b-icon-chevron-double-down/></h1>
      <b-row v-for="(row, key) in dotmatrix" :key="key" class="mb-4">
        <span class="mx-auto dot" v-for="(dot) in row" :key="dot.id" @click="dot.on = !dot.on">
          <b-icon-circle v-if="!dot.on"/>
          <b-icon-circle-fill v-else/>
        </span>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {

  },
  data(){
    return {
      dotmatrix: [],
    }
  },
  created() {
    for (var i = 0; i < 12; i++) {
      this.dotmatrix.push([]);
      for (var j = 0; j < 24; j++) {
        this.dotmatrix[i].push({id: i+','+j, on:false});
      }
    } 
  },
}
</script>

<style lang="scss" scoped>
  .dot { transition: transform .2s; }
  .dot:hover { transform: scale(1.5); }
</style>
