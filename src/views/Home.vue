<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col>
          <h1 class="text-left inktrap display-1 mt-5 ml-3">Hi, I'm Gregor!</h1>
          <h1 class="text-left inktrap display-5 ml-3">
            Before I tell you something about me, I'd like to encourage you to make your own mark on my site.
          </h1>
          <h1>
            <b-icon-chevron-double-right/>
            <b-icon-chevron-double-down/>
          </h1>
        </b-col>
        <b-col>
          <div :key="JSON.stringify(dotmatrix)" class="mx-auto" style="width: 360px; height:640px; margin-top: 120px; display:flex; flex-direction:column;justify-content:space-around;">
            <div v-for="(row, key) in dotmatrix" :key="key" class="w-100" style="display:flex; flex-direction:row; justify-content:space-around;">
              <div v-for="(dot) in row" :key="JSON.stringify(dot.coord)" @click="dotClicked(dot)">
                <div v-if="dot.on" :class="classesForDotOn(dot)" :style="`animation-delay: ${animDelayForDot(dot)}s; color:red`"></div>
                <div v-else class="dot"></div>
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
      lastClickedDot: {},
    }
  },
  created() {
    for (var i = 0; i < 18; i++) { //rows
      this.dotmatrix.push([]);
      for (var j = 0; j < 8; j++) { //cols
        this.dotmatrix[i].push({coord: {x:j,y:i}, on:false, animColor:''});
      }
    }
  },
  methods: {
    dotClicked(dot) {
      this.lastClickedDot = dot;
      dot.on = !dot.on;
      var rd = this.randNum(1,3);
      if (rd == 1) {
        dot.animColor = 'animYellow';
      } else if (rd == 2) {
        dot.animColor = 'animBlue';
      } else {
        dot.animColor = 'animRed';
      }
    },
    classesForDotOn(dot) {
      return `dot dot-on ${this.shouldAnimate(dot) ? dot.animColor : ''}`;
    },
    shouldAnimate(dot) {
      console.log(JSON.stringify(dot.coord));
      console.log(JSON.stringify(this.dotmatrix[dot.coord.y][dot.coord.x]));

      let countDotsOn = 0;
      if (dot.coord.y > 0) {
        countDotsOn += Number(this.dotmatrix[dot.coord.y-1][dot.coord.x].on); //upmid
        if (dot.coord.x > 0) {
          countDotsOn += Number(this.dotmatrix[dot.coord.y-1][dot.coord.x-1].on); //upleft
        }
        if (dot.coord.x < this.dotmatrix[0].length-1) {
          countDotsOn += Number(this.dotmatrix[dot.coord.y-1][dot.coord.x+1].on); //upright
        }
      }
      if (dot.coord.y < this.dotmatrix.length-1) {
        countDotsOn += Number(this.dotmatrix[dot.coord.y+1][dot.coord.x].on); //downmid
        if (dot.coord.x > 0) {
          countDotsOn += Number(this.dotmatrix[dot.coord.y+1][dot.coord.x-1].on); //downleft
        }
        if (dot.coord.x < this.dotmatrix[0].length-1) {
          countDotsOn += Number(this.dotmatrix[dot.coord.y+1][dot.coord.x+1].on); //downright
        }
      }
      if (dot.coord.x > 0) {
        countDotsOn += Number(this.dotmatrix[dot.coord.y][dot.coord.x-1].on); //midleft
      }
      if (dot.coord.x < this.dotmatrix[0].length-1) {
        countDotsOn += Number(this.dotmatrix[dot.coord.y][dot.coord.x+1].on); //midright
      }   
      const distance = Math.abs(dot.coord.x - this.lastClickedDot.coord.x) + Math.abs(dot.coord.y - this.lastClickedDot.coord.y);
      if (countDotsOn > 3) {
        return dot.coord.x % 4 == 0 && dot.coord.y % 4 == 0 && distance < 8
      } else {
        return distance < 8
      }
    },
    animDelayForDot(dot) {
      const xDiff = Math.abs(dot.coord.x - this.lastClickedDot.coord.x);
      const yDiff = Math.abs(dot.coord.y - this.lastClickedDot.coord.y);
      return (xDiff + yDiff) * 0.05
    },
    randNum(min, max) {
      return Math.floor(Math.random() * (max+1 - min) + min);
    },
    isOdd(num) {

    }
  },
}
</script>

<style lang="scss" scoped>
  .dot { 
    border: 3px solid rgba(44, 62, 80, 1);
    border-radius: 50%;
    height: 20px;
    width: 20px;

    //box-shadow: 0 0 0 0 rgba(44, 62, 80, 0.5);
  }
  .dot:hover { 
    //transition: border .2s; 
    border: 4px solid rgba(44, 62, 80, 1);
  }

  .dot-on {
    background: rgba(44, 62, 80, 1);
    //animation: pulseBlue 4s ease 0s;
    //animation-duration: 4s;
    //animation-name: pulseYellow;
  }

  .animYellow {
    animation: pulseYellow 4s ease;
    will-change: box-shadow;
  }

  .animBlue {
    animation: pulseBlue 4s ease;
    will-change: box-shadow;
  }

  .animRed {
    animation: pulseRed 4s ease;
    will-change: box-shadow;
  }

  @keyframes pulseYellow {
    0% {
      //transform: scale(1.0);
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
      //transform: scale(1.0);
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
      //transform: scale(1.0);
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.2);
    }
    70% {
      //transform: scale(1.0);
      box-shadow: 0 0 0 1000px rgba(255, 0, 0, 0);
    }
    100% {
      //transform: scale(1.0);
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
    }
  }
</style>
