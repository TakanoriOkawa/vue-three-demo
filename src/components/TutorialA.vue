<template>
  <div class="tutorialA">
    <canvas id="myCanvas2"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GUI } from 'three/examples/jsm/libs/dat.gui.module';


export default {
  name: 'TutorialA',
  methods:{
    init(){
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas2'),
        antialias: true,
      })

      
      renderer.setClearColor("#e5e5e5");
      renderer.setSize(innerWidth,innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45,innerWidth / innerHeight,1,10000,);

      //画面サイズを変えてもcanvasが変わるようにする
      addEventListener('resize', () => {
        renderer.setSize(innerWidth,innerHeight);
        //カメラのアスペクト比が画面サイズを変更した時に変更される。
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
      })

      
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;


      camera.position.set(0,0,1000);
      const geometry = new THREE.OctahedronGeometry(100,0);
      const geometry2 = new THREE.BoxGeometry(100,100,100);
      const material = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
      })

      const ob = new THREE.Mesh(geometry,material);
      const ob2 = new THREE.Mesh(geometry2,material);
      ob2.position.set(100,100,0);

      scene.add(ob);
      scene.add(ob2);

      const directionalLight = new THREE.DirectionalLight( 0xffffff , 2.0 );

      directionalLight.position.set(1,1,1);
      scene.add(directionalLight);

      //最終出力
      renderer.render(scene ,camera);

      // //GUI
      // let gui = new GUI();
      // let params = {
      //   color: 0x00ff00,
      //   scale: 1,
      // }
      // gui.addColor(params, 'color').onChange(() => {
      //   ob.material.color.set(params.color);
      // })
      // gui.add(params, 'scale' , 1.0, 4.0).onChange(() => {
      //   obj2.scale.set(params.scale,params.scale,params.scale);
      // })

      tick();
      function tick(){
        requestAnimationFrame(tick);
        //箱を回転させる
        ob.rotation.x -= 0.02;
        ob.rotation.y -= 0.02;

        //画面サイズを変更しても、常時レンダリングしているので歪まない
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
.tutorialA{
  position: relative;
}

#myCanvas2{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
}
</style>