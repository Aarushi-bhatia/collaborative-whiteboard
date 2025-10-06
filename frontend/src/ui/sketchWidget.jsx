import React, { useEffect, useRef, useState } from 'react'

const SketchWidget = () => {
    const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    // Draw some example shapes
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(150, 100, 40, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ec4899';
    ctx.beginPath();
    ctx.moveTo(250, 80);
    ctx.lineTo(320, 80);
    ctx.lineTo(320, 130);
    ctx.lineTo(250, 130);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(80, 180);
    ctx.quadraticCurveTo(150, 140, 220, 180);
    ctx.stroke();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const newTrail = { x, y, id: Date.now() };
    setTrails(prev => [...prev.slice(-8), newTrail]);
  };


  return (
    <div>
          {/* Interactive demo area */}
          <div 
            className="relative bg-gray-50 rounded-2xl p-8 border border-gray-200"
            onMouseMove={handleMouseMove}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-80 bg-white rounded-lg"
              style={{ cursor: 'crosshair' }}
            />
            
            {/* Animated cursors */}
            <div 
              className="absolute pointer-events-none transition-all duration-100"
              style={{ 
                left: `${mousePos.x}px`, 
                top: `${mousePos.y}px`,
                transform: 'translate(-4px, -4px)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M3 3l14 5-6 2-2 6z" fill="#6366f1"/>
              </svg>
            </div>

            {/* Trail effect */}
            {trails.map((trail, i) => (
              <div
                key={trail.id}
                className="absolute w-2 h-2 rounded-full bg-indigo-400 pointer-events-none"
                style={{
                  left: `${trail.x}px`,
                  top: `${trail.y}px`,
                  opacity: (i + 1) / trails.length * 0.5,
                  transition: 'opacity 0.3s'
                }}
              />
            ))}

            {/* Other user indicators */}
            <div className="absolute top-12 right-12 animate-pulse">
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M3 3l14 5-6 2-2 6z" fill="#10b981"/>
              </svg>
              <div className="absolute -bottom-6 left-0 bg-emerald-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Maya
              </div>
            </div>

            <div className="absolute bottom-24 left-16 animate-pulse" style={{ animationDelay: '0.3s' }}>
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M3 3l14 5-6 2-2 6z" fill="#ec4899"/>
              </svg>
              <div className="absolute -bottom-6 left-0 bg-pink-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Alex
              </div>
            </div>
          </div> 
           

    </div>
  )
}

export default SketchWidget