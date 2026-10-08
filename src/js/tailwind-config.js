/* ==========================================================================
   VENACARE — TAILWIND PLAY CDN CONFIGURATION
   Loaded immediately after the Tailwind CDN script on every page.
   ========================================================================== */

if (window.tailwind) {
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          ink: {
            950: '#07090f',
            900: '#0b0e14',
            850: '#0e121a',
            800: '#10141d',
            700: '#161b26'
          },
          blood: {
            400: '#ff5c72',
            500: '#ff2e4c',
            600: '#e11d48',
            700: '#b91c2b',
            800: '#8f1724'
          },
          amberx: '#ff8a3d'
        },
        fontFamily: {
          sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
          display: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif']
        },
        maxWidth: {
          shell: '1200px'
        },
        boxShadow: {
          glow: '0 0 40px -12px rgba(255,46,76,0.65)',
          'glow-sm': '0 0 0 1px rgba(255,46,76,0.25), 0 8px 30px -12px rgba(255,46,76,0.55)'
        }
      }
    }
  };
}
