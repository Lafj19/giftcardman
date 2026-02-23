import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { CardDesign } from '../../types';
import { QrCode } from 'lucide-react';

interface Card3DProps {
  design: CardDesign;
  className?: string;
  interactive?: boolean;
  editable?: boolean;
  onUpdateDesign?: (updates: Partial<CardDesign>) => void;
}

export function Card3D({ design, className = '', interactive = true, editable = false, onUpdateDesign }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);
  const glassX = useTransform(mouseXSpring, [-0.5, 0.5], ['-100%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    x.set(0);
    y.set(0);
  };

  const getBackgroundStyle = () => {
    if (design.type === 'color') return { backgroundColor: design.background };
    if (design.type === 'gradient') return { backgroundImage: design.background };
    if (design.type === 'image') return { backgroundImage: `url(${design.background})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    return { backgroundColor: '#e5e7eb' };
  };

  const qrPositionClasses = {
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
  };

  const logoDragX = useMotionValue(0);
  const logoDragY = useMotionValue(0);
  const textDragX = useMotionValue(0);
  const textDragY = useMotionValue(0);

  return (
    <div className={`perspective-1000 ${className}`} style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformStyle: 'preserve-3d',
          ...getBackgroundStyle()
        }}
        className="relative w-full aspect-[1.586/1] rounded-2xl shadow-2xl overflow-hidden border border-white/20 transition-shadow duration-300 hover:shadow-3xl"
      >
        {/* Dark overlay for better text readability on images */}
        {design.type === 'image' && (
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        )}

        {/* Glass reflection effect */}
        {interactive && (
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none opacity-30"
            style={{
              background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 25%, transparent 30%)',
              x: glassX,
            }}
          />
        )}

        <div className="absolute inset-0" style={{ transform: 'translateZ(30px)' }}>
          <div className="absolute top-6 right-6 text-sm font-mono opacity-80 tracking-widest pointer-events-none" style={{ color: design.textColor }}>
            GIFT CARD
          </div>

          <motion.div
            drag={editable}
            dragMomentum={false}
            onDragEnd={(e, info) => {
              if (onUpdateDesign) {
                onUpdateDesign({
                  logoPosition: {
                    x: design.logoPosition.x + info.offset.x,
                    y: design.logoPosition.y + info.offset.y,
                  }
                });
              }
              logoDragX.set(0);
              logoDragY.set(0);
            }}
            style={{
              x: logoDragX,
              y: logoDragY,
              z: 30,
              position: 'absolute',
              left: design.logoPosition.x,
              top: design.logoPosition.y,
              cursor: editable ? 'move' : 'default',
              zIndex: 20,
            }}
            className={editable ? 'hover:ring-2 hover:ring-indigo-500 hover:ring-offset-2 hover:ring-offset-transparent rounded p-1 transition-shadow' : ''}
          >
            {design.logo ? (
              <img src={design.logo} alt="Logo" style={{ height: design.logoSize, objectFit: 'contain' }} draggable={false} />
            ) : (
              <div style={{ height: design.logoSize, width: design.logoSize * 3 }} className="bg-white/20 rounded backdrop-blur-sm flex items-center justify-center text-white/50 text-xs font-medium">
                LOGO
              </div>
            )}
          </motion.div>

          {design.text && (
            <motion.div
              drag={editable}
              dragMomentum={false}
              onDragEnd={(e, info) => {
                if (onUpdateDesign) {
                  onUpdateDesign({
                    textPosition: {
                      x: design.textPosition.x + info.offset.x,
                      y: design.textPosition.y + info.offset.y,
                    }
                  });
                }
                textDragX.set(0);
                textDragY.set(0);
              }}
              style={{
                x: textDragX,
                y: textDragY,
                z: 40,
                position: 'absolute',
                left: design.textPosition.x,
                top: design.textPosition.y,
                color: design.textColor,
                fontSize: design.textSize,
                cursor: editable ? 'move' : 'default',
                zIndex: 20,
              }}
              className={`${design.textFont} font-semibold tracking-tight whitespace-nowrap ${editable ? 'hover:ring-2 hover:ring-indigo-500 hover:ring-offset-2 hover:ring-offset-transparent rounded px-2 py-1 -ml-2 -mt-1 transition-shadow' : ''}`}
            >
              {design.text}
            </motion.div>
          )}

          {design.showQR && (
            <div 
              className={`absolute ${qrPositionClasses[design.qrPosition]} bg-white p-2 rounded-lg shadow-sm pointer-events-none`}
              style={{ transform: 'translateZ(20px)' }}
            >
              <QrCode className="w-10 h-10 text-gray-900" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
