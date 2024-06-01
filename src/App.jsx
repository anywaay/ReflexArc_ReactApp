import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ReflexArc from './components/ReflexArc';
import ErrorBoundary from './components/ErrorBoundary';
import "./App.css";

const App = () => {
  const ref = useRef();
  const [modelPosition, setModelPosition] = useState([0, 0.9, 0]);
  const [modelScale, setModelScale] = useState([3.5, 3.5, 3.5]);
  const [initialCameraTarget, setInitialCameraTarget] = useState([0, 0, 0]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          setModelPosition(prevPosition => [prevPosition[0], prevPosition[1] - 0.5, prevPosition[2]]);
          break;
        case 'ArrowDown':
          setModelPosition(prevPosition => [prevPosition[0], prevPosition[1] + 0.5, prevPosition[2]]);
          break;
        case 'ArrowLeft':
          setModelPosition(prevPosition => [prevPosition[0] , prevPosition[1], prevPosition[2]- 0.5]);
          break;
        case 'ArrowRight':
          setModelPosition(prevPosition => [prevPosition[0] , prevPosition[1], prevPosition[2]+ 0.5]);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div className="app-container">
      <h1>Simulation of Reflex Arc</h1>
      <div className="canvas-container">
      <ErrorBoundary>
          <Canvas className="canvas" shadows dpr={[1, 2]} camera={{ position: [50, 0, 0], fov: 35 }}>
            <Suspense fallback={null}>
              <directionalLight position={[1, 5, 1]} intensity={4.5}/>
              <ambientLight intensity={0.5} />
              <ReflexArc position={modelPosition} scale={modelScale} />
            </Suspense>
            <OrbitControls ref={ref} target={initialCameraTarget} />
          </Canvas>
        </ErrorBoundary>
      </div>
      <div className="buttons-container">
        <button className="button">Update</button>
        <button className="button">Reset</button>
        <button className="button">Clear</button>
        <button className="button">Animate</button>
      </div>
    </div>
  );
};

export default App;
