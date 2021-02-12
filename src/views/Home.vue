<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col>
          <h1 class="text-left inktrap display-3 mt-4 mt-md-5 ml-md-3">Hi, I'm Gregor!</h1>
          <h2 class="text-left ml-md-3 my-4">
            <a href="mailto:gregor.l.wolf@gmail.com" class="text-reset mr-3">
              <b-iconstack font-scale="1.5">
                <b-icon-envelope-fill stacked scale="0.6"/>
                <b-icon-circle stacked/>
              </b-iconstack>
            </a>
            <a href="https://github.com/greglbub" class="text-reset mr-3">
              <b-iconstack font-scale="1.5">
                <b-icon-github stacked scale="0.6"/>
                <b-icon-circle stacked/>
              </b-iconstack>
            </a>
            <a href="https://www.paypal.com/donate?hosted_button_id=9AJSPC3S83C9W" class="text-reset mr-3">
              <b-iconstack font-scale="1.5" class="mr-2">
                <b-icon-heart-fill stacked scale="0.55" shift-v="-0.5"/>
                <b-icon-circle stacked icon=""/>
              </b-iconstack>
            </a>
          </h2>
          <div class="h3 text-left inktrap ml-md-3">
            I study computer science and I like to think about the interaction between <span class="marked" style="animation-delay: 2.5s;">people and tech</span> as a <span class="marked" style="animation-delay: 3s;">cultural process</span>.
          </div>
          <br>
          <div class="h3 text-left inktrap ml-md-3">
            As a small example I'd like to encourage you to leave <span class="marked" style="animation-delay: 7s;">your own mark</span> on my site.
            <b-icon-chevron-double-right class="arrow-right"/>
          </div>
          <h1 class="arrow-down text-left"><b-icon-chevron-double-down/></h1>
          <br>
        </b-col>
        <b-col style="margin-top: 120px;" class="pt-md-4 pb-5 pb-md-1 mx-0 px-0">
          <h5 style="max-width: 360px;" class="mx-auto">Just tap on one of the dots to change them for everyone.</h5>
          <div :key="JSON.stringify(dotmatrix)" class="mx-auto" style="max-width: 360px; height:540px; display:flex; flex-direction:column;justify-content:space-around;">
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
    <br>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {

  },
  data(){
    return {
      dotsObject: undefined,
      dotmatrix: [],
      lastClickedDot: {},
      marked: true,
    }
  },
  created() {
    if (this.dotsObject == undefined) {
      for (var i = 0; i < 12; i++) { //rows
        this.dotmatrix.push([]);
        for (var j = 0; j < 8; j++) { //cols
          this.dotmatrix[i].push({coord: {x:j,y:i}, on:false, animColor:''});
        }
      }
    }  
  },
  async mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      fetch("https://parseapi.back4app.com/classes/Dotmatrix/FCQLTd2Xdz", {
        headers: {
          "X-Parse-Application-Id": this.$parseAppId,
          "X-Parse-Rest-Api-Key": this.$parseAPIKey,
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        //console.log(JSON.stringify(data.dots));
        this.dotmatrix = data.dots;
        this.lastClickedDot = this.dotmatrix[6][4];
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    async saveData() {
      fetch("https://parseapi.back4app.com/classes/Dotmatrix/FCQLTd2Xdz", {
        body: `{\"dots\": ${JSON.stringify(this.dotmatrix)} }`,
        headers: {
          "Content-Type": "application/json",
          "X-Parse-Application-Id": this.$parseAppId,
          "X-Parse-Rest-Api-Key": this.$parseAPIKey,
        },
        method: "PUT"
      })
      .then((resp) => {
        //console.log(resp)
      })
      .catch(function(error) {
        console.log(error);
      });
    },
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
      this.saveData()
    },
    classesForDotOn(dot) {
      return `dot dot-on ${this.shouldAnimate(dot) ? dot.animColor : ''}`;
    },
    shouldAnimate(dot) {
      //console.log(JSON.stringify(dot.coord));
      //console.log(JSON.stringify(this.dotmatrix[dot.coord.y][dot.coord.x]));

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
  },
}
</script>

<style lang="scss" scoped>
  .marked {
    color:  #2c3e50;
    padding: 0px;
    background-image: linear-gradient(to right, rgba(255, 230, 106, 0) 50%, rgba(255, 230, 106, 0.5) 50%);
    background-position: 0;
    background-size: 200%;
    animation: marking 0.5s ease-out;
    will-change: background-position;
    animation-fill-mode: forwards;
  }
  @keyframes marking {
    0% {
      background-position: 0;
    }
    100% {
      background-position: -100%;
    }
  }

  .arrow-right {
    display: none !important;
  }
  
  @media (min-width: 768px) {
    .arrow-right {
      display: inline !important;
    }
    .arrow-down {
      display: none;
    }
  }

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
