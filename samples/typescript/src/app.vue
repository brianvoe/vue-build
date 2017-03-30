<script lang="ts">
  import Vue, { ComponentOptions } from 'vue'

  export default {
    data () {
      return {
        info: 'Hello World'
      }
    },
  } as ComponentOptions<Vue>
</script>

<template>
  <div>{{info}}</div>
</template>
