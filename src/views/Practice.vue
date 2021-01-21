<template>
  <div class="practice">
    <h1 class="title">Practice</h1>
    <canvas id="myCanvas"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera';

export default {
  name: 'Practice',

  methods:{
    init(){
      //renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true , canvas:document.querySelector("#myCanvas")});
      //最初にサイズを決めて
      renderer.setClearColor("#666");
      renderer.setSize(innerWidth,innerHeight);
      //ピクセル比を設定
      renderer.setPixelRatio(devicePixelRatio);

      //camera
      const camera = new CinematicCamera(45,innerWidth / innerHeight,1,10000);
      camera.position.set(2,1,500);
      // scene
      const scene = new THREE.Scene();

      //light
      const light = new THREE.DirectionalLight(0xffffff, 3);
      const light2 = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(0,1000,0);
      light.position.set(0,-1000,0);
      scene.add(light);
      scene.add(light2);

      //sphere
      const material = new THREE.MeshStandardMaterial({color: 0x00ff00});
      const geometry = new THREE.SphereBufferGeometry(20,20,20);
      const mesh = new THREE.Mesh(geometry,material);
      mesh.position.set(0,-100,0)
      scene.add(mesh);

    for ( let i = 0; i < 700; i ++ ) {
        const object = new THREE.Mesh(geometry , new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff }));
        object.position.x = Math.random() * 800 - 400;
        object.position.y = Math.random() * 800 - 400;
        object.position.z = Math.random() * 800 - 400;

        scene.add( object );

      }

      renderer.render(scene,camera);
      render();

      const radius = 100;
      let theta = 0;

      function render(){
        //繰り返し処理には必須
        requestAnimationFrame(render);
        theta += 0.5;
        camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
				camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
				camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
				camera.lookAt( scene.position );
        camera.updateMatrixWorld();
        renderer.render(scene,camera);
      }
    }
  },

  mounted(){
    this.init();
  }
}

//カメラ回転をとりあえず。
</script>


<style lang="scss" scoped>
body{
  margin: 0;
}

.practice{
  position:relative;
}
.title{
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  color: rgb(206, 206, 206);
  font-size: 70px;
  margin: 0;
  padding: 10px;
  text-shadow: 6px 6px rgb(71, 71, 71);
  box-shadow: 6px 6px  rgb(71, 71, 71);
  border: 4px solid rgb(206, 206, 206);
  z-index: 10;
}

#myCanvas{
  position: fixed;
  top:0;
  left:0;
  // zが低くてもorbitは効く
  // z-index: -10;
}

</style>