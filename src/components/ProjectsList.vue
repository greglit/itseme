<template>
  <div>
    <b-container class="mt-5">
      <h1 class="inktrap text-left display-4">Recent Projects</h1>
      <b-row v-for="project in projects" :key="JSON.stringify(project)">
        <b-col>
          <project-card :project="project"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ProjectCard from './ProjectCard.vue'

export default {
  name: 'ProjectsList',
  components: {
    ProjectCard

  },
  data(){
    return {
      projects : [
        { 
          name: 'Policy Bear', 
          desc: 'Contribution to the <a href="https://hackthearctic.com/">Hack The Arctic Hackathon</a> together with <a href="https://github.com/RSciFi">Friedrich Röseler</a>: We developed a prototype for a web interface to generate short and relatable sentences in a beautiful layout from arctic climate data sets to use them in the next conference or meeting.',
          img: require('@/assets/img/policybear.png'),
          URL: 'https://policybear.gregl.it/'
        },
        { 
          name: 'Rudiboard', 
          desc: 'Modern Vue.js web app with real time database connection: Track games and scores and plan tournaments at the office, in your shared flat or your favorite bar.',
          img: require('@/assets/img/rudiboard.png'),
          URL: 'https://rudiboard.gregl.it/'
        },
        { 
          name: 'Bachelor Thesis: "Making SHAP Rap: Accessible and Interactive Explainable AI for End Users"', 
          desc: 'A prototype for an accessible and interactive loan decision-support system on the basis of SHAP.',
          img: require('@/assets/img/shaprap.png'),
          URL: ''
        },
        { 
          name: 'shouldigoout', 
          desc: 'A fun little project for a website to raise awarenes about the corona virus pandemic in an interesting way.',
          img: 'https://shouldigoout.gregl.it/media/art.png',
          URL: 'https://shouldigoout.gregl.it/',
        },
        { 
          name: 'Project Kapcsolat', 
          desc: 'Playable teaser for a comando-prompt-driven mystery story adventure game realized with plain HTML/CSS and TypeScript. ',
          img: require('@/assets/img/kapcsolat.png'),
          URL: 'https://kapcsolat.gregl.it/',
        }
      ]
    }
  },
  created() {
    
  },
  async mounted() {
    
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
  
</style>
