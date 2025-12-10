import React from 'react';

export const OfficialStamp: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative ${className} select-none`}>
      <svg viewBox="0 0 200 200" className="w-full h-full text-blue-900 opacity-90">
        <defs>
          <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
          <path id="innerCircle" d="M 100, 100 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" />
        </defs>
        
        {/* Outer Ring */}
        <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" />
        
        {/* Inner Ring */}
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
        
        {/* Top Text */}
        <text className="text-[19px] font-bold fill-current tracking-tighter" style={{ textTransform: 'uppercase' }}>
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
            BHRASTACHAR MUKT BHARAT MISSION
          </textPath>
        </text>

        {/* Bottom Text (Approximate placement via rotation/transforms since textPath bottom is tricky) */}
         <g transform="rotate(180, 100, 100)">
             <text className="text-[12px] font-bold fill-current tracking-widest" y="5">
                <textPath href="#innerCircle" startOffset="50%" textAnchor="middle">
                   INTEGRITY • TRANSPARENCY • SERVICE
                </textPath>
            </text>
         </g>

        {/* Center Graphic: Shield & Wheel */}
        <g transform="translate(70, 65) scale(0.6)">
             <path fill="currentColor" d="M50 0 C50 0 15 10 5 30 C-5 50 5 90 50 100 C95 90 105 50 95 30 C85 10 50 0 50 0 Z M50 90 C20 80 15 50 20 35 C25 25 50 15 50 15 C50 15 75 25 80 35 C85 50 80 80 50 90 Z" />
             <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
             <line x1="50" y1="35" x2="50" y2="65" stroke="currentColor" strokeWidth="1" />
             <line x1="35" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="1" />
             <line x1="39" y1="39" x2="61" y2="61" stroke="currentColor" strokeWidth="1" />
             <line x1="39" y1="61" x2="61" y2="39" stroke="currentColor" strokeWidth="1" />
        </g>
        
        {/* Bottom Year */}
        <text x="100" y="145" textAnchor="middle" className="text-[14px] font-bold fill-current">Bm.Bm. 2025</text>
      </svg>
    </div>
  );
};