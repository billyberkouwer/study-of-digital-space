/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.2 torus.gltf --transform
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { LineBasicMaterial, MeshStandardMaterial } from 'three'
import { useFrame } from '@react-three/fiber'

export function Torus(props) {
  const { nodes, materials } = useGLTF('/torus-transformed.glb');
  const material = new MeshStandardMaterial();
  const mouseVelocity = useRef({x: 0, y: 0});
  const ref = useRef();
  material.wireframe = true;
  
  useEffect(() => {
    let isMouseDown = false;

    window.addEventListener("mousedown", () => {
      isMouseDown = true;
    })

    window.addEventListener("mouseup", () => {
      isMouseDown = false;
    })

    window.addEventListener('mousemove', (e) => {
      if (isMouseDown === true) {
        mouseVelocity.current = {
          x: e.movementX,
          y: e.movementY
        }
      }
    })
  })

  useFrame(() => {
    ref.current.rotation.x+=0.01;
    ref.current.rotation.y+=0.002;
    ref.current.rotation.z+=0.001;
    ref.current.rotation.x += mouseVelocity.current.x/800;
    ref.current.rotation.y += mouseVelocity.current.y/800;
    if (mouseVelocity.current.x > 1) {
      mouseVelocity.current.x-=0.5;
    }
    if (mouseVelocity.current.y > 1) {
      mouseVelocity.current.y-=0.5;
    }
    if (mouseVelocity.current.x < 1) {
      mouseVelocity.current.x+=0.5;
    }
    if (mouseVelocity.current.y < 1) {
      mouseVelocity.current.y+=0.5;
    }
  })

  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh geometry={nodes.Torus.geometry} material={material} />
    </group>
  )
}

useGLTF.preload('/torus-transformed.glb')
