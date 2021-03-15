<template>
  <div>
    <b-card  no-body class="overflow-hidden my-5 shadow border-0 text-left">
      <b-row no-gutters>
        <b-col md="4">
          <div class="overflow-hidden">
            <img :src="project.img" :alt="project.name" class="rounded-0 image" />
          </div>
        </b-col>
        <b-col md="8">
          <b-card-body :title="project.name">
            <b-card-text v-html="project.desc">
            </b-card-text>
            <a v-if="project.URL != ''" :href="project.URL">Have a look <b-icon-chevron-double-right/></a>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'ProjectCard',
  components: {

  },
  props: ['project'],
  data(){
    return {
      
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
  @media (max-width: 992px) {
    .image {
      width: 100%;
    }
  }

  .image {
    height:300px;
    object-fit: scale-down;
  }
</style>
