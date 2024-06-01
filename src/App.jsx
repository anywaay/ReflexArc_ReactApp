import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import ReflexArc from './components/ReflexArc'
import ErrorBoundary from './components/ErrorBoundary'
import "./App.css";
const App=()=> {
  const ref = useRef()
  return (
    <ErrorBoundary>
 <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
      <Suspense fallback={null}>
        <Stage controls={ref} preset="rembrandt" intensity={2}  environment="city">
          <ReflexArc />
        </Stage>
      </Suspense>
      <OrbitControls ref={ref} />
    </Canvas>
    </ErrorBoundary>
  )
}

export default App;