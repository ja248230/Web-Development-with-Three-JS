import { useEffect, useRef } from 'react'
import './App.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'

function App() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg')
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.setZ(30)

    renderer.render(scene, camera)
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
    const material = new THREE.MeshStandardMaterial({ color: 0xFF6347})
    const torus = new THREE.Mesh(geometry, material)
    scene.add(torus)
    const pointLight = new THREE.PointLight(0xffffff)
    pointLight.position.set(20, 20, 20)
    
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight)

    const lightHelper = new THREE.PointLightHelper(pointLight)
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(lightHelper, gridHelper)

  const controls = new OrbitControls(camera, renderer.domElement)
   /*  const stargeometry = new THREE.SphereGeometry(0.25, 24, 24)
    const starmaterial = new THREE.MeshStandardMaterial({ color: 0xffffff})
   function addStar(){
      const star  = new THREE.Mesh(stargeometry, starmaterial)

      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
      star.position.set(x, y, z)
      scene.add(star)
    }
      Array(200).fill().forEach(addStar)
*/
    /*  const spaceText = new THREE.TextureLoader().load('space.jpg')
      scene.background = spaceText*/
      function moveCamera(){
        const t = document.body.getBoundingClientRect().top;

        camera.position.z = t * -0.01
        camera.position.x = t * -0.0002
        camera.position.y = t * -0.0002
      }
      document.body.onscroll = moveCamera
    function animate() {
      requestAnimationFrame(animate)
      torus.rotation.x += 0.01
      torus.rotation.y += 0.005
      torus.rotation.z += 0.01
     controls.update()
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      renderer.dispose()
    }
  }, [])

  return (
      <div className="App">
         <canvas ref={canvasRef} id="bg" />
      </div>
  )
}

export default App
