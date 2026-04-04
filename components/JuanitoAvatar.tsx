import { cn } from '@/lib/utils'

interface JuanitoAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  className?: string
}

const sizes = {
  sm: 'w-8 h-8 text-lg',
  md: 'w-12 h-12 text-2xl',
  lg: 'w-20 h-20 text-4xl',
  xl: 'w-28 h-28 text-5xl',
}

export default function JuanitoAvatar({
  size = 'md',
  animated = false,
  className,
}: JuanitoAvatarProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full',
        'bg-gradient-to-br from-terracotta-100 to-ochre-100',
        'border-2 border-terracotta-200 shadow-sm',
        sizes[size],
        animated && 'animate-bounce-subtle',
        className,
      )}
      role="img"
      aria-label="Juanito, your Spanish tutor"
    >
      {/* SVG Avatar — stylised character */}
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3/4 h-3/4"
      >
        {/* Hair */}
        <ellipse cx="40" cy="24" rx="18" ry="14" fill="#5C3317" />
        {/* Face */}
        <ellipse cx="40" cy="35" rx="16" ry="18" fill="#F5C5A0" />
        {/* Hair top shape */}
        <path d="M24 26 Q28 12 40 11 Q52 12 56 26" fill="#5C3317" />
        {/* Left eye */}
        <ellipse cx="33" cy="34" rx="3" ry="3.5" fill="#2D1B0E" />
        <ellipse cx="33.8" cy="33" rx="1" ry="1" fill="white" />
        {/* Right eye */}
        <ellipse cx="47" cy="34" rx="3" ry="3.5" fill="#2D1B0E" />
        <ellipse cx="47.8" cy="33" rx="1" ry="1" fill="white" />
        {/* Eyebrows */}
        <path d="M29 29 Q33 27 37 29" stroke="#5C3317" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M43 29 Q47 27 51 29" stroke="#5C3317" strokeWidth="1.5" strokeLinecap="round" />
        {/* Nose */}
        <ellipse cx="40" cy="40" rx="2.5" ry="2" fill="#E8A87C" />
        {/* Smile */}
        <path d="M33 46 Q40 52 47 46" stroke="#B06B45" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Cheeks */}
        <ellipse cx="28" cy="43" rx="4" ry="3" fill="#F09060" opacity="0.35" />
        <ellipse cx="52" cy="43" rx="4" ry="3" fill="#F09060" opacity="0.35" />
        {/* Collar / shirt - terracotta */}
        <path d="M24 56 Q30 53 40 54 Q50 53 56 56 L58 70 L22 70 Z" fill="#C86A4A" />
        {/* Neck */}
        <rect x="35" y="51" width="10" height="6" rx="2" fill="#F5C5A0" />
        {/* Star / teacher badge */}
        <text x="36" y="67" fontSize="8" fill="#FAF7F2" fontFamily="serif">✦</text>
      </svg>
    </div>
  )
}
