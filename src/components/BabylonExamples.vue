<template>

<div>
<h3>Bablon Examples</h3>
<canvas></canvas>

</div>
 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LightsShadows } from '@/BabylonExamples/LightsShadows';

export default defineComponent({
  name: 'BabylonExamples',
  mounted() {
      const canves = document.querySelector('canvas');
      if(canves){
        new LightsShadows(canves);
      }
      
  }

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

canvas {
    width: 70%;
    height: 70%;
}

</style>
