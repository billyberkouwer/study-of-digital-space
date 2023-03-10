import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Color, TorusGeometry } from 'three'
import { useFrame } from '@react-three/fiber'
import { lineMaterial } from './Materials';

export function Torus({theme}) {
  const mouseVelocity = useRef({x: 0, y: 0});
  const ref = useRef();
  const geo = new TorusGeometry(1.5,0.4,16,100)
  if (theme === 'dark') {
    lineMaterial.color = new Color('white')
  }
  if (theme === 'light') {
    lineMaterial.color = new Color('black')
  }
  
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
    });

    return () => {
      window.removeEventListener("mousedown", () => {
        isMouseDown = true;
      })
  
      window.removeEventListener("mouseup", () => {
        isMouseDown = false;
      })
  
      window.removeEventListener('mousemove', (e) => {
        if (isMouseDown === true) {
          mouseVelocity.current = {
            x: e.movementX,
            y: e.movementY
          }
        }
      });
    }
  }, [])

  useFrame(() => {
    ref.current.rotation.x+=0.01;
    ref.current.rotation.y+=0.002;
    ref.current.rotation.z+=0.001;
    ref.current.rotation.x += mouseVelocity.current.x/600;
    ref.current.rotation.y += mouseVelocity.current.y/600;
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
      <lineSegments material={lineMaterial} geometry={geo} dispose={null} ref={ref} position={[0,0,-1]} />
  )
}

useGLTF.preload('/torus-transformed.glb')
