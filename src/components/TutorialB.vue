<template>
  <div class="tutorialB">
    <canvas id="myCanvas"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';
import * as TWEEN from 'gsap'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: 'TutorialB',

  methods:{
    init(){
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
        antialias: true,
      })

      renderer.setClearColor("#cccccc");
      renderer.setSize(innerWidth,innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45,innerWidth / innerHeight,1,10000);

      //画面サイズを変えてもcanvasが変わるようにする
      addEventListener('resize', () => {
        renderer.setSize(innerWidth,innerHeight);
        //カメラのアスペクト比が画面サイズを変更した時に変更される。
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
      })
      camera.position.set(0,0,1000);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      
      //マウスがcanvasのどの位置にあるかを調べる
      const raycast = new THREE.Raycaster();
      //位置情報を格納する
      const mouse = new THREE.Vector2();
      const geometry = new THREE.TorusGeometry(100,10,30,30);
      const material = new THREE.MeshLambertMaterial({color: 0xffff00})

      for(let i = 0; i < 15; i++){
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * 1000,
          (Math.random() - 0.5) * 1000,
          (Math.random() - 0.5) * 1000
        )
        scene.add(mesh);
      }

      const directionalLight = new THREE.DirectionalLight( 0xffffff , 2.0 );
      directionalLight.position.set(1,1,1);
      const helperDirectional = new THREE.DirectionalLightHelper(directionalLight, 50);
      scene.add(helperDirectional);
      scene.add(directionalLight);


      //最終出力
      renderer.render(scene ,camera);

      //event情報を引数に
      function onMouseMove(event){
        //イベントの伝播を停止。
        event.preventDefault();
        // -1 ~ 1の範囲を作る
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        //光線を発射
        raycast.setFromCamera(mouse, camera);
        //交差したオブジェクト情報を取得。
        const intersects = raycast.intersectObjects(scene.children, true);
        
        for(let i = 0; i < intersects.length; i++){
          // intersects[i].object.material.color.set(0xff0000);
          const tl = new TWEEN.TimelineMax();
          tl.to(intersects[i].object.scale, 1, {x: 2, y: 2,z:2, ease: TWEEN.Expo.easeOut});

        }
      }

      tick();
      function tick(){
        requestAnimationFrame(tick);
        //画面サイズを変更しても、常時レンダリングしているので歪まない
        renderer.render(scene ,camera);
      }
      window.addEventListener('mousemove', onMouseMove)
    },
  },

  mounted(){
    //初期化
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.tutorialB{
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