import * as React from "react";

// Self-contained keyframes for the animation. This makes the component portable.
const animationKeyframes = `
  @keyframes infinity-loader-travel {
    0% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -100; }
  }
`;

/**
 * Infinity Loader Component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional class names for the container for custom styling
 * @param {number} [props.size=40] - The size of the loader in pixels
 * @param {React.Ref} ref - Forwarded ref
 */


const InfinityLoader = React.forwardRef(
  ({ className, size = 40, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...props.style }}
        {...props}
      >
        {/* Injects the keyframes into the document head */}
        <style>{animationKeyframes}</style>
        <svg
          // FIX: Expanded viewBox from "0 0 40 40" to "-2 -2 44 44".
          // This adds a 2px padding on all sides to prevent the 4px stroke from being clipped.
          viewBox="-2 -2 44 44"
          height={size}
          width={size}
          aria-hidden="true" // Decorative SVG is hidden from screen readers
        >
          {/* Background track path using muted theme color */}
          <path
            style={{ stroke: '#666', opacity: 0.5 }}
            fill="none"
            strokeWidth={4}
            pathLength={100}
            d="M29.76 18.72 c0 7.28-3.92 13.6-9.84 16.96 c-2.88 1.68-6.24 2.64-9.84 2.64 c-3.6 0-6.88-0.96-9.76-2.64 c0-7.28 3.92-13.52 9.84-16.96 c2.88-1.68 6.24-2.64 9.76-2.64 S26.88 17.04 29.76 18.72 c5.84 3.36 9.76 9.68 9.84 16.96 c-2.88 1.68-6.24 2.64-9.76 2.64 c-3.6 0-6.88-0.96-9.84-2.64 c-5.84-3.36-9.76-9.68-9.76-16.96 c0-7.28 3.92-13.6 9.76-16.96 C25.84 5.12 29.76 11.44 29.76 18.72z"
          />
          {/* Animated path using primary theme color */}
          <path
            style={{ animation: `infinity-loader-travel 2s linear infinite`, stroke: '#ee2525ff' }}
            fill="none"
            strokeWidth={4}
            strokeDasharray="15, 85"
            strokeDashoffset={0}
            strokeLinecap="round"
            pathLength={100}
            d="M29.76 18.72 c0 7.28-3.92 13.6-9.84 16.96 c-2.88 1.68-6.24 2.64-9.84 2.64 c-3.6 0-6.88-0.96-9.76-2.64 c0-7.28 3.92-13.52 9.84-16.96 c2.88-1.68 6.24-2.64 9.76-2.64 S26.88 17.04 29.76 18.72 c5.84 3.36 9.76 9.68 9.84 16.96 c-2.88 1.68-6.24 2.64-9.76 2.64 c-3.6 0-6.88-0.96-9.84-2.64 c-5.84-3.36-9.76-9.68-9.76-16.96 c0-7.28 3.92-13.6 9.76-16.96 C25.84 5.12 29.76 11.44 29.76 18.72z"
          />
        </svg>
        {/* Accessible text for screen readers */}
        <span style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: '0' }}>Loading...</span>
      </div>
    );
  }
);
InfinityLoader.displayName = "InfinityLoader";

export { InfinityLoader };
