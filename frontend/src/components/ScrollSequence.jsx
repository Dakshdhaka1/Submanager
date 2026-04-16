import { useRef, useEffect } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const ScrollSequence = ({ frameCount = 100, imagePathPrefix = '/sequence/frame_', imageExtension = '.png' }) => {
    const canvasRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Transform scroll progress (0 to 1) into a frame index (1 to frameCount)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

    // Preload images for smooth playback
    const imagesRef = useRef([]);

    useEffect(() => {
        // Preload all frames
        const preloadImages = async () => {
            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                // Pad the number with leading zeros (e.g., 001, 002... if needed)
                // Or just direct numbers. Let's assume frame_1.png to frame_100.png
                img.src = `${imagePathPrefix}${i}${imageExtension}`;
                imagesRef.current[i] = img;
            }
        };

        preloadImages();

        // Draw the first frame on mount
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const firstImg = new Image();
        firstImg.src = `${imagePathPrefix}1${imageExtension}`;
        firstImg.onload = () => {
            // Scale image to cover canvas
            drawCover(ctx, firstImg, canvas.width, canvas.height);
        };
    }, [frameCount, imagePathPrefix, imageExtension]);

    // Update canvas when scroll changes
    useMotionValueEvent(frameIndex, "change", (latest) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const currentFrame = Math.round(latest);
        const img = imagesRef.current[currentFrame];

        if (img && img.complete) {
            drawCover(ctx, img, canvas.width, canvas.height);
        }
    });

    // Helper to draw image like background-size: cover
    const drawCover = (ctx, img, w, h) => {
        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = w;
            drawHeight = w / imgRatio;
            offsetX = 0;
            offsetY = (h - drawHeight) / 2;
        } else {
            drawWidth = h * imgRatio;
            drawHeight = h;
            offsetX = (w - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
            <canvas
                ref={canvasRef}
                width={1920}
                height={1080}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
            {/* Dark overlay to make text readable */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.5), rgba(0,0,0,0.95))'
            }}></div>
        </div>
    );
};

export default ScrollSequence;
