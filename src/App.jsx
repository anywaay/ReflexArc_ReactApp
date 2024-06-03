import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ReflexArc from './components/ReflexArc';
import ErrorBoundary from './components/ErrorBoundary';
import "./App.css";

const App = () => {
  const ref = useRef();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSliceClicked, setIsSliceClicked] = useState(false);
  const [armPosition, setArmPosition] = useState([-14.301, 7.398, 9.125]); 
  const [modelPosition, setModelPosition] = useState([0, 0.9, 0]);
  const [modelScale, setModelScale] = useState([3.5, 3.5, 3.5]);
  const [initialCameraTarget, setInitialCameraTarget] = useState([0, 0, 0]);

  const handleSlice = ()=>{
    setIsSliceClicked(true);
  }
  const handleAnimate = () => {
    setIsAnimating(true);
  };

  const handleReset = () => {
    setArmPosition([-14.301, 7.398, 9.125]);
    setModelPosition([0, 0.9, 0]);
    setIsAnimating(false);
    setIsSliceClicked(false);
  };

  const handleClear = () => {
    setInitialCameraTarget([0, 20, 0]); 
    setArmPosition([-14.301, 7.398, 9.125]);
    setIsAnimating(false);
  };
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'w':
          setModelPosition(prevPosition => [prevPosition[0], prevPosition[1] - 0.5, prevPosition[2]]);
          break;
        case 's':
          setModelPosition(prevPosition => [prevPosition[0], prevPosition[1] + 0.5, prevPosition[2]]);
          break;
        case 'a':
          setModelPosition(prevPosition => [prevPosition[0], prevPosition[1], prevPosition[2] - 0.5]);
          break;
        case 'd':
          setModelPosition(prevPosition => [prevPosition[0], prevPosition[1], prevPosition[2] + 0.5]);
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
          <Canvas className="canvas" shadows dpr={[1, 2]} camera={{ position: [50, 10, 10], fov: 35 }}>
            <Suspense fallback={null}>
              <directionalLight position={[1, 5, 1]} intensity={4.5}/>
              <ambientLight intensity={0.5} />
              <ReflexArc position={modelPosition} scale={modelScale} arm={armPosition} isAnimating={isAnimating}
              isSliced={isSliceClicked} />
            </Suspense>
            {/* <OrbitControls ref={ref} target={initialCameraTarget} /> */}
            {!isSliceClicked && <OrbitControls ref={ref} target={initialCameraTarget} />}
          </Canvas>
        </ErrorBoundary>
      </div>
      <div className="buttons-container">
        <button className="button" onClick={handleSlice}>Slice</button>
        <button className="button" onClick={handleReset}>Reset</button>
        <button className="button" onClick={handleClear}>Clear</button>
        <button className="button" onClick={handleAnimate}>Animate</button>
      </div>
    </div>
  );
};

export default App;
