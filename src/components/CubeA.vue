<template>
  <div class="cubeA">
    <canvas id="myCanvas"></canvas>
    <div class="container">
      <!-- <h1 style="color: red">SceneA</h1> -->
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'cubeA',

  data(){
    return{
      width: innerWidth,
      height: innerHeight / 2,
    }
  },

  methods:{
    init(){
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
      })

      renderer.setSize(this.width,this.height);
      renderer.setPixelRatio(window.devicePixelRatio);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        this.width / this.height,
        1,
        10000,
      );

      camera.position.set(0,0,2000);

      const geometry = new THREE.TorusKnotGeometry(600,8,57,20,20,1);
      const material = new THREE.MeshStandardMaterial({
        color: 0x4400ff,
      })

      const box = new THREE.Mesh(geometry,material);
      scene.add(box);


      const directionalLight = new THREE.DirectionalLight( 0xffffff , 3.0);

      directionalLight.position.set(1,1,1);
      scene.add(directionalLight);

      //最終出力
      renderer.render(scene ,camera);

      tick();

      function tick(){
        requestAnimationFrame(tick);
        //箱を回転させる

        box.rotation.x += 0.01;
        box.rotation.y += 0.01;

        renderer.render(scene ,camera);
      }
    },
  },


  mounted(){
    //初期化
    this.init();
  }
};
</script>


<style lang="scss" scoped>
.cubeA{
  position: relative;
}

#myCanvas{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
}

</style>