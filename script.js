let bubbleInterval;

        function addBubbles() {
            if (bubbleInterval) {
                clearInterval(bubbleInterval);
                bubbleInterval = null;
                return;
            }
            
            bubbleInterval = setInterval(() => {
                const bubble = document.createElement('div');
                bubble.className = 'bubble';
                bubble.style.width = Math.random() * 10 + 5 + 'px';
                bubble.style.height = bubble.style.width;
                bubble.style.left = Math.random() * 140 + 20 + 'px';
                bubble.style.bottom = '20px';
                
                document.querySelector('.lava-container').appendChild(bubble);
                
                setTimeout(() => {
                    bubble.remove();
                }, 4000);
            }, 500);
        }

        // Create random bubbles occasionally
        setInterval(() => {
            if (Math.random() < 0.3) {
                const bubble = document.createElement('div');
                bubble.className = 'bubble';
                bubble.style.width = Math.random() * 8 + 3 + 'px';
                bubble.style.height = bubble.style.width;
                bubble.style.left = Math.random() * 140 + 20 + 'px';
                bubble.style.bottom = '20px';
                
                document.querySelector('.lava-container').appendChild(bubble);
                
                setTimeout(() => {
                    bubble.remove();
                }, 4000);
            }
        }, 2000);

        // Function to convert hex to RGB
        function hexToRgb(hex) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return { r, g, b };
        }

        // Function to convert RGB to HSL
        function rgbToHsl(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0; // achromatic
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            return { h, s, l };
        }

        // Event listener for color change
        const blobColorInput = document.getElementById('blobColor');
        blobColorInput.addEventListener('input', function () {
            const hex = this.value;
            const rgb = hexToRgb(hex);
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

            const h = hsl.h;
            const s = hsl.s;
            const l = hsl.l;

            // Calculate three lightness values for blob gradient
            const l1 = Math.max(0, l - 0.1);
            const l2 = l;
            const l3 = Math.min(1, l + 0.1);

            // Create hsla strings for blobs
            const color1 = `hsla(${h * 360}, ${s * 100}%, ${l1 * 100}%, 0.9)`;
            const color2 = `hsla(${h * 360}, ${s * 100}%, ${l2 * 100}%, 0.8)`;
            const color3 = `hsla(${h * 360}, ${s * 100}%, ${l3 * 100}%, 0.7)`;

            // Calculate glow colors
            const glowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
            const insetColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;

            // Update each blob
            const blobs = document.querySelectorAll('.blob');
            blobs.forEach(blob => {
                blob.style.background = `radial-gradient(circle at 30% 30%, ${color1}, ${color2}, ${color3})`;
                blob.style.boxShadow = `0 0 20px ${glowColor}, inset 0 0 20px ${insetColor}`;
            });

            // Update heating element
            const l_heat1 = Math.min(1, l + 0.2);
            const l_heat2 = Math.min(1, l + 0.3);
            const heatColor1 = `hsla(${h * 360}, ${s * 100}%, ${l_heat1 * 100}%, 0.8)`;
            const heatColor2 = `hsla(${h * 360}, ${s * 100}%, ${l_heat2 * 100}%, 0.9)`;
            const heatingElement = document.querySelector('.heating-element');
            heatingElement.style.background = `linear-gradient(90deg, ${heatColor1} 0%, ${heatColor2} 50%, ${heatColor1} 100%)`;
        });