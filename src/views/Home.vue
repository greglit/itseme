<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col>
          <h1 class="text-left inktrap display-1 mt-5">Hi, I'm Gregor!</h1>
          <h1 class="text-left inktrap display-5">
            Before I tell you something about me, I'd like to encourage you to make your own mark on my site.
          </h1>
          <h1><b-icon-chevron-double-right/></h1>
        </b-col>
        <b-col>
          <div :key="JSON.stringify(dotmatrix)" class="mx-auto" style="width: 360px; height:640px; margin-top: 120px; display:flex; flex-direction:column;justify-content:space-around;">
            <div v-for="(row, key) in dotmatrix" :key="key" class="w-100" style="display:flex; flex-direction:row; justify-content:space-around;">
              <div :class="decideClass(dot)" :style="`animation-delay: ${animDelayForDot(dot)}s;`" v-for="(dot) in row" :key="String(dot.coord)" @click="dotClicked(dot)">
              </div>
            </div>
          </div>
        </b-col>
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
      newDotCoord: [],
    }
  },
  created() {
    for (var i = 0; i < 20; i++) { //rows
      this.dotmatrix.push([]);
      for (var j = 0; j < 10; j++) { //cols
        this.dotmatrix[i].push({coord: [i,j], on:false});
      }
    }
  },
  methods: {
    dotClicked(dot) {
      this.newDotCoord = dot.coord;
      dot.on = !dot.on;
    },
    decideClass(dot) {
      var result = dot.on? `dot dot-on ${this.animClass(dot)}` : 'dot';
      return result;
    },
    animClass(dot) {
      var rd = this.randNum(1,4);
      if (rd == 1) {
        return 'animYellow';
      } else if (rd == 2) {
        return 'animBlue';
      } else {
        return 'animRed';
      }
    },
    animForDot(dot) {
      return `pulseBlue 4s ease ${this.animDelayForDot(dot)}`;
    },
    animDelayForDot(dot) {
      const xDiff = Math.abs(dot.coord[0] - this.newDotCoord[0]);
      const yDiff = Math.abs(dot.coord[1] - this.newDotCoord[1]);
      return (xDiff + yDiff) * 0.05
    },
    randNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
  },
}
</script>

<style lang="scss" scoped>
  .dot { 
    transition: transform .2s; 
    border: solid rgba(44, 62, 80, 1);
    border-radius: 50%;
    height: 20px;
    width: 20px;

    //box-shadow: 0 0 0 0 rgba(44, 62, 80, 0.5);
  }
  .dot:hover { transform: scale(1.5); }

  .dot-on {
    background: rgba(44, 62, 80, 1);
    //animation: pulseBlue 4s ease 0s;
    //animation-duration: 4s;
    //animation-name: pulseYellow;
  }

  .animYellow {
    animation: pulseYellow 4s ease;
  }

  .animBlue {
    animation: pulseBlue 4s ease;
  }

  .animRed {
    animation: pulseRed 4s ease;
  }

  @keyframes pulseYellow {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 255, 0, 0.2);
    }
    70% {
      box-shadow: 0 0 0 1000px rgba(255, 255, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 255, 0, 0);
    }
  }
  @keyframes pulseBlue {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 0, 255, 0.2);
    }
    70% {
      box-shadow: 0 0 0 1000px rgba(0, 0, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 0, 255, 0);
    }
  }
  @keyframes pulseRed {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.2);
    }
    70% {
      box-shadow: 0 0 0 1000px rgba(255, 0, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
    }
  }
</style>
