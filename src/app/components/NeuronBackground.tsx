"use client";

import { useEffect, useRef } from "react";

export default function NeuronBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      wobble: number;
      glow: boolean;
    }[] = [];
    const stars: { x: number; y: number; radius: number }[] = [];
    const numStars = 150; // Number of stars
    let numParticles = 100;
    let maxConnectionDistance = 600;
    let newParticlesCount = 0; // Track the number of new particles added
    const maxNewParticles = 30; // Limit the total number of new particles to 30

    // Initialize stars (static background)
    const initializeStars = () => {
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2, // Random small size
        });
      }
    };

    // Initialize particles
    const initializeParticles = (count: number) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          wobble: Math.random() * Math.PI * 2,
          glow: Math.random() < 0.1, // 10% of particles will glow
        });
      }
    };

    initializeStars();
    initializeParticles(numParticles);

    // Draw stars
    const drawStars = () => {
      ctx.fillStyle = "white";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Draw individual particles with optional glow
    const drawParticle = (particle: any) => {
      if (particle.glow) {
        // Create a radial gradient for the glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          20
        );
        gradient.addColorStop(0, "rgba(255, 223, 222, 0.8)"); // Bright center (pinkish glow)
        gradient.addColorStop(1, "rgba(255, 223, 222, 0)"); // Fading edges
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 20, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw the particle itself
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw wobbly curved connections
    const drawCurves = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxConnectionDistance) {
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2.1;

            // Add a slower wobble effect to the midpoint
            const wobbleX =
              Math.sin(particles[i].wobble + particles[j].wobble) * 10; // Less exaggerated wobble
            const wobbleY =
              Math.cos(particles[i].wobble + particles[j].wobble) * 10;

            const controlX = midX + wobbleX;
            const controlY = midY + wobbleY;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.quadraticCurveTo(
              controlX,
              controlY,
              particles[j].x,
              particles[j].y
            );
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxConnectionDistance})`; // Slightly dimmer lines
            ctx.lineWidth = 0.7; // Thicker lines
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars first (static background)
      drawStars();

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Update wobble phase slowly
        particle.wobble += 0.02;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw each particle
        drawParticle(particle);
      });

      // Gradually increase connection distance and add more particles
      if (maxConnectionDistance < 200) {
        maxConnectionDistance += 0.05;
      }

      // Add new particles, but limit the total number to 30 and randomize speed
      if (particles.length < 200 && newParticlesCount < maxNewParticles && Math.random() < 0.01) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (Math.random() * 2 + 1), // Random speed
          vy: (Math.random() - 0.5) * (Math.random() * 2 + 1), // Random speed
          wobble: Math.random() * Math.PI * 2,
          glow: Math.random() < 0.1, // 20% chance to glow
        });
        newParticlesCount++; // Increment the counter for new particles
      }

      drawCurves();
      requestAnimationFrame(animate);
    };

    animate();

    // Resize canvas on window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reinitialize stars for the resized canvas
      stars.length = 0;
      initializeStars();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
}
