import React, { useEffect, useState } from 'react';

const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Array<{id: number, left: string, top: string, size: string, duration: string, delay: string}>>([]);

  useEffect(() => {
    // Generate static particles on mount to avoid re-renders
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 6 + 2}px`,
      duration: `${Math.random() * 20 + 10}s`,
      delay: `${Math.random() * -20}s`
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particle-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: Math.random() * 0.5 + 0.1
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;