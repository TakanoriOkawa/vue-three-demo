<template>
  <div class="home">
    <cubeA />
    <cubeB />

  </div>
</template>

<script>
import cubeA from '../components/CubeA';
import cubeB from '../components/CubeB';

export default {
  name: 'Home',

  components:{
    cubeA,
    cubeB,
  }
}
</script>