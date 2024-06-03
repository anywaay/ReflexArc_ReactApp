    import React, { useRef, useState, useEffect } from 'react';
    import { useGLTF, useAnimations } from '@react-three/drei';
    import { a } from '@react-spring/three';
    import { useFrame } from '@react-three/fiber';

    const ReflexArc = ({position, scale, arm, isAnimating, isSliced}) => {
      const group = useRef();
      const armatureRef = useRef();
      const mouse = useRef([0, 0]);
      const { nodes, materials, animations } = useGLTF('reflexarc.glb');
      const { actions } = useAnimations(animations, group);

      const [isArmSelected, setIsArmSelected] = useState(false);
      const [isBezierSelected, setIsBezierSelected] = useState(false);
      const [isOvalSelected, setIsOvalSelected] = useState(false);
      const [armPosition, setArmPosition] = useState([-14.301, 7.398, 9.125]);
      const [bezierPosition, setBezierPosition] =useState([-1.822, 7.935, -9.449]);
      const [leftOval, setLeftOval] = useState([-0.375, 7.657, -7.208]);
      const [rightOval, setRightOval] = useState([0.304, 7.612, -10.971]);

        useEffect(() => {
        if (isAnimating) {
          actions['CircleAction.001'].play();
          actions['NurbsPathAction'].play();
          actions['Plane.001Action'].play();
          actions['ArmatureAction'].play();
          actions['ArmatureAction.001'].play();
          actions['ArmatureAction.002'].play();
          actions['BezierCurve.011Action'].play();
          actions['Armature.003Action'].play();

          const timeoutId = setTimeout(() => {
          // actions['ArmatureAction'].stop();
          }, 1000);
          return () => clearTimeout(timeoutId);
        }
      }, [isAnimating, actions]);


      const handleArmClick = () => {
        console.log("arm selected ")
        setIsArmSelected(true);
      };
      const handleBezierClick=()=>{
        setIsBezierSelected(true);
      }
      const handleOvalClick=()=>{
        setIsOvalSelected(true);
      }

      const handleMouseUp = ()=>{
        setIsArmSelected(false);
        setIsBezierSelected(false);
        setIsOvalSelected(false);
      }


      useEffect(() => {
        setArmPosition([-14.301, 7.398, 9.125]);
        setBezierPosition([-1.822, 7.935, -9.449]);
        setLeftOval([-0.375, 7.657, -7.208])
        setRightOval([0.304, 7.612, -10.971])
        actions['CircleAction.001'].stop();
        actions['NurbsPathAction'].stop();
        actions['Plane.001Action'].stop();
        actions['ArmatureAction'].stop();
        actions['ArmatureAction.001'].stop();
        actions['ArmatureAction.002'].stop();
        actions['BezierCurve.011Action'].stop();
        actions['Armature.003Action'].stop();
      }, [position]);

      useEffect(() => {
        setArmPosition([-14.301, 7.398, 9.125]);
        setBezierPosition([-1.822, 7.935, -9.449]);
        setLeftOval([-0.375, 7.657, -7.208])
        setRightOval([0.304, 7.612, -10.971])
        actions['CircleAction.001'].stop();
        actions['NurbsPathAction'].stop();
        actions['Plane.001Action'].stop();
        actions['ArmatureAction'].stop();
        actions['ArmatureAction.001'].stop();
        actions['ArmatureAction.002'].stop();
        actions['BezierCurve.011Action'].stop();
        actions['Armature.003Action'].stop();
      }, [arm]);

      const handleMouseMove = (event) => {
        if (isSliced) {
            if(isArmSelected){
              // console.log("now moving arm");
              const { clientX, clientY } = event;
              const x = (clientX - window.innerWidth / 2) / 100;
              const y = (clientY - window.innerHeight / 2) / 100;
              setArmPosition([x + armPosition[0], y+ armPosition[1], armPosition[2]]);
              // console.log("arm position is: ", {armPosition})
            }
            if(isBezierSelected){
              const { clientX, clientY } = event;
              const x = (clientX - window.innerWidth / 2) / 100;
              const y = (clientY - window.innerHeight / 2) / 100;
              setBezierPosition([x + bezierPosition[0], y+ bezierPosition[1], bezierPosition[2]]);
            }
            if(isOvalSelected){
              const { clientX, clientY } = event;
              const x = (clientX - window.innerWidth / 2) / 100;
              const y = (clientY - window.innerHeight / 2) / 100;
              setLeftOval([x+leftOval[0], y+leftOval[1], leftOval[2]]);
              setRightOval([x+rightOval[0], y+rightOval[1], rightOval[2]]);
            }
            
        }
      };

      useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        };
      }, [isArmSelected, isBezierSelected, isOvalSelected]);

      useFrame(() => {
        if (isArmSelected) {
          const x = mouse.current[0] / 1000;
          const y = mouse.current[1] / 1000;
          if (armatureRef.current) {
            armatureRef.current.rotation.y = x;
            armatureRef.current.rotation.x = y;
          }
        }
      });

      useEffect(() => {
        if (armatureRef.current) {
          armatureRef.current.position.set(...armPosition);
        }
      }, [armPosition]);

      


      return (
        <a.group ref={group} scale={scale} position={position} dispose={null}>
          <group>
            <group name="NurbsPath" position={[0.433, 3.765, 3.067]} rotation={[0, Math.PI / 2, 0]}>
              <mesh
                name="Circle"
                geometry={nodes.Circle.geometry}
                material={materials['Material.008']}
                position={[3.595, 0.91, -0.109]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.054}
              />
            </group>
            <group name="candlestick" rotation={[Math.PI / 2, 0, 0]} scale={0.001}>
              <group name="candle" position={[13.106, 0, 0]}>
                <group
                  name="flame_lights"
                  position={[-71.691, 67.447, -3119.953]}
                  rotation={[-Math.PI / 2, 0, -Math.PI]}>
                  <mesh
                    name="tip"
                    geometry={nodes.tip.geometry}
                    material={materials.tip}
                    position={[-126.087, 118.524, 375.621]}
                    rotation={[-Math.PI / 2, 0, Math.PI]}
                  />
                </group>
              </group>
              <mesh
                name="rusty_base"
                geometry={nodes.rusty_base.geometry}
                material={materials['rusty base']}
                position={[15.879, 736.109, -646.991]}
                rotation={[0.324, -0.013, -1.608]}
              />
              <mesh
                name="wax"
                geometry={nodes.wax.geometry}
                material={materials.wax1}
                position={[-14.588, 349.439, -1905.742]}
              />
            </group>
            <group onClick={handleBezierClick}>
            <group name="BezierCurve" />
            <group
              name="BezierCurve001"
              position={bezierPosition}
              rotation={[-0.016, -0.199, -0.162]}>
              <mesh
                name="BezierCurve001_primitive0"
                geometry={nodes.BezierCurve001_primitive0.geometry}
                material={materials['Material.002']}
              />
              <mesh
                name="BezierCurve001_primitive1"
                geometry={nodes.BezierCurve001_primitive1.geometry}
                material={materials['Material.003']}
              />
            </group>
            </group>
            <group name='leftoval' onClick={handleOvalClick}>
            <group name="BezierCurve003" />
            <group name="Cube001" position={leftOval} scale={0.163}>
              <mesh
                name="Cube001_primitive0"
                geometry={nodes.Cube001_primitive0.geometry}
                material={materials['Material.005']}
              />
              <mesh
                name="Cube001_primitive1"
                geometry={nodes.Cube001_primitive1.geometry}
                material={materials['Material.004']}
              />
            </group>
            </group>
            <group name='rightOval' onClick={handleOvalClick}>
            <group
              name="Cube002"
              position={rightOval}
              rotation={[0, 0, -Math.PI]}
              scale={-0.163}>
              <mesh
                name="Cube002_primitive0"
                geometry={nodes.Cube002_primitive0.geometry}
                material={materials['Material.005']}
              />
              <mesh
                name="Cube002_primitive1"
                geometry={nodes.Cube002_primitive1.geometry}
                material={materials['Material.004']}
              />
            </group>
            </group>
            <group onClick={handleArmClick}    position={armPosition}>
            <group name="Armature"  
            >
              <group name="11535_arm_V3_" />
              <primitive object={nodes.Bone} />
              <group name="11535_arm_V3__1">
                <skinnedMesh
                  name="11535_arm_V3__primitive0"
                  geometry={nodes['11535_arm_V3__primitive0'].geometry}
                  material={materials._11535_arm_V3_FINALdefault}
                  skeleton={nodes['11535_arm_V3__primitive0'].skeleton}
                />
                <skinnedMesh
                  name="11535_arm_V3__primitive1"
                  geometry={nodes['11535_arm_V3__primitive1'].geometry}
                  material={materials['Material.006']}
                  skeleton={nodes['11535_arm_V3__primitive1'].skeleton}
                />
              </group>
            </group>
            </group>
            <group name="Armature001" onClick={handleArmClick}
              position={[-14.301, 7.398, 9.125]}
              >
              <group name="Cube" />
              <primitive object={nodes.Bone_1} />
              <skinnedMesh
                name="Cube_1"
                geometry={nodes.Cube_1.geometry}
                material={materials['Material.011']}
                skeleton={nodes.Cube_1.skeleton}
              />
            </group>
            <group name="Armature002"  onClick={handleArmClick}
            position={[-14.301, 7.398, 9.125]}>
              <group
                name="Bone_2"
                position={[13.448, -1.104, -15.335]}
                rotation={[1.506, 0.672, -0.174]}>
                <group name="Bone001_2" position={[0, 1.396, 0]} rotation={[0.43, 0.055, 0.506]}>
                  <group name="Bone002_2" position={[0, 2.807, 0]} rotation={[0.287, -0.045, -0.333]}>
                    <group name="Bone003_2" position={[0, 2.416, 0]} rotation={[0.115, 0.067, 0.385]} />
                  </group>
                </group>
              </group>
            </group>
            <group name="Armature003" position={[-7.543, -3.04, 2.515]}>
              <group name="BezierCurve004" />
              <primitive object={nodes.Bone_3} />
              <primitive object={nodes.neutral_bone} />
            </group>

            <group
            name='viens total'
            >
            <group name="BezierCurve004_1">
              <skinnedMesh
                name="BezierCurve004_primitive0"
                geometry={nodes.BezierCurve004_primitive0.geometry}
                material={materials['Material.005']}
                skeleton={nodes.BezierCurve004_primitive0.skeleton}
              />
              <skinnedMesh
                name="BezierCurve004_primitive1"
                geometry={nodes.BezierCurve004_primitive1.geometry}
                material={materials['Material.004']}
                skeleton={nodes.BezierCurve004_primitive1.skeleton}
              />
            </group>
            </group>
            <mesh
              name="Cube003"
              geometry={nodes.Cube003.geometry}
              material={materials['Material.012']}
              position={[0, -10.9, -1.901]}
              rotation={[0, 0.052, 0]}
              scale={31.022}
            />
            <mesh
              name="Cube004"
              geometry={nodes.Cube004.geometry}
              material={materials['Material.012']}
            />
            <mesh
              name="BezierCurve002"
              geometry={nodes.BezierCurve002.geometry}
              material={materials['__GLTFLoader._default']}
            />
            <mesh
              name="BezierCurve005"
              geometry={nodes.BezierCurve005.geometry}
              material={materials['Material.001']}
              position={[-1.822, 7.935, -9.449]}
              rotation={[-0.016, -0.199, -0.162]}
            />
            <mesh
              name="Plane"
              geometry={nodes.Plane.geometry}
              material={materials['Material.009']}
              position={[-0.033, 2.752, 0.293]}
              rotation={[0, 0, -Math.PI / 2]}
              scale={0.2}
            />
            <mesh
              name="Plane001"
              geometry={nodes.Plane001.geometry}
              material={materials['Material.007']}
              position={[0, -3.044, -4.219]}
              rotation={[0, 0.09, 0]}
              scale={[14.302, 14.302, 18.35]}
            />
            <mesh
              name="BezierCurve007"
              geometry={nodes.BezierCurve007.geometry}
              material={materials['Material.010']}
              position={[1.284, 5.679, -5.783]}
            />
            <mesh
              name="BezierCurve008"
              geometry={nodes.BezierCurve008.geometry}
              material={materials['Material.004']}
              position={[0.443, 5.679, -5.783]}
            />
            <mesh
              name="BezierCurve009"
              geometry={nodes.BezierCurve009.geometry}
              material={materials['Material.010']}
              position={[0.841, 5.681, -12.35]}
              rotation={[0.012, 0.001, 3.14]}
              scale={-1}
            />
            <mesh
              name="BezierCurve010"
              geometry={nodes.BezierCurve010.geometry}
              material={materials['Material.004']}
              position={[0.659, 5.634, -12.398]}
              rotation={[0, 0, -Math.PI]}
              scale={-1}
            />
            <mesh
              name="BezierCurve011"
              geometry={nodes.BezierCurve011.geometry}
              material={materials['Material.005']}
              position={[0.841, 5.681, -12.35]}
              rotation={[0.012, 0.001, 3.14]}
              scale={-1}
            />
          </group>
        </a.group>
      );
    };

    export default ReflexArc;
