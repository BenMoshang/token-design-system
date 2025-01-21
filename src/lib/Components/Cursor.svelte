<script>
    import { onMount } from 'svelte';
  
    // Current position of the ring
    let posX = 0;
    let posY = 0;
    // Target position from the mouse event
    let targetX = 0;
    let targetY = 0;
  
    // Easing factor for smooth movement (0 < easing < 1)
    const easing = 0.075;
  
    const handleMouseMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };
  
    onMount(() => {
      window.addEventListener('mousemove', handleMouseMove);
  
      const animate = () => {
        // Update current positions using linear interpolation (lerp)
        posX += (targetX - posX) * easing;
        posY += (targetY - posY) * easing;
        requestAnimationFrame(animate);
      };
  
      animate();
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    });
  </script>
  
  <style>
    .cursor {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none; /* Ensures the ring doesn't interfere with page interactions */
      width: 2rem;       /* Width of the ring */
      height: 2rem;      /* Height of the ring */
      border: 2px solid rgba(255, 255, 255, 0.631); /* Outer ring styling */
      border-radius: 50%;
      z-index: 9999;
      background: transparent; /* Transparent center to create a ring effect */
    }
  </style>
  
  <!-- Apply the transform so that the center of the ring follows the cursor -->
  <div
    class="cursor"
    style:transform={`translate(${posX - 20}px, ${posY - 20}px)`}>
  </div>
  