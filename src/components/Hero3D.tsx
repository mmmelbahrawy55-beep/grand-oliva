"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import { useLocaleStore } from "@/lib/store";

function OliveJar() {
  return (
    <group>
      <Sphere args={[0.8, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} transparent opacity={0.7} />
      </Sphere>
      <Sphere args={[0.75, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2a2a2a" roughness={0.1} metalness={0.9} transparent opacity={0.5} />
      </Sphere>
      <Sphere args={[0.4, 32, 32]} position={[-0.3, 0.3, 0.5]}>
        <meshStandardMaterial color="#8B4513" roughness={0.2} metalness={0.8} />
      </Sphere>
      <Sphere args={[0.35, 32, 32]} position={[0.3, -0.2, 0.6]}>
        <meshStandardMaterial color="#8B4513" roughness={0.2} metalness={0.8} />
      </Sphere>
      <Sphere args={[0.3, 32, 32]} position={[0, 0.4, 0.4]}>
        <meshStandardMaterial color="#A0522D" roughness={0.2} metalness={0.8} />
      </Sphere>
    </group>
  );
}

export default function Hero3D() {
  const { locale } = useLocaleStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden border border-[#c9a96e]/20 gold-glow-strong"
    >
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#c9a96e" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <pointLight position={[0, 0, 5]} intensity={1} color="#c9a96e" />
        <Environment preset="warehouse" />
        <OliveJar />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          rotateSpeed={0.5}
        />
      </Canvas>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="text-[#c9a96e] text-xs font-semibold tracking-[0.3em] uppercase mb-2">
            {locale === "ar" ? "معرض 3D تفاعلي" : "Interactive 3D Showcase"}
          </div>
          <div className="text-white text-sm opacity-70">
            {locale === "ar" ? "اسحب وحرك لتجربة المنتج" : "Drag to explore the product in 3D"}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
