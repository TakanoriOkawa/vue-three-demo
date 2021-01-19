<template>
  <div class="cubeB">
    <canvas id="myCanvas2"></canvas>
    <div class="container">
      <!-- <p style="color: white">SceneB</p> -->
    </div>

  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


export default {
  name: 'cubeA',

  data(){
    return{
      width: innerWidth ,
      height: innerHeight / 2,
    }
  },

  methods:{
    init(){
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas2'),
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

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;


      camera.position.set(0,0,1000);

      const geometry = new THREE.OctahedronGeometry(100,0);
      const wallGeometry = new THREE.BoxGeometry(10000,10000,1);

      const material = new THREE.MeshStandardMaterial({
        color: 0x0055ff,
      })

      const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
      })

      const wall = new THREE.Mesh(wallGeometry, wallMaterial);
      wall.position.set(0,0,-500);
      scene.add(wall);

      let box = [];

      for(let i = 0 ; i < 7; i++){
        box[i] = new THREE.Mesh(geometry,material);
        box[i].position.x =  -1200 + ( i * 400);
        console.log(box[i].position.x);
        scene.add(box[i]);
      }

      const directionalLight = new THREE.DirectionalLight( 0xffffff , 2.0 );

      directionalLight.position.set(1,1,1);
      scene.add(directionalLight);

      //最終出力
      renderer.render(scene ,camera);

      tick();

      function tick(){
        requestAnimationFrame(tick);
        //箱を回転させる

        box[1].rotation.x -= 0.02;
        box[1].rotation.y -= 0.02;

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

#myCanvas2{
  position: fixed;
  top: 50%;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
}

</style>