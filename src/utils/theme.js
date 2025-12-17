// // Theme management
// export const THEMES = {
//   LIGHT: 'light',
//   DARK: 'dark',
//   SYSTEM: 'system'
// };

// export class ThemeManager {
//   constructor() {
//     this.currentTheme = this.getStoredTheme() || THEMES.SYSTEM;
//     this.applyTheme(this.currentTheme);
    
//     // Listen for system theme changes
//     if (window.matchMedia) {
//       window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
//         if (this.currentTheme === THEMES.SYSTEM) {
//           this.applySystemTheme();
//         }
//       });
//     }
//   }

//   getStoredTheme() {
//     return localStorage.getItem('theme');
//   }

//   setTheme(theme) {
//     this.currentTheme = theme;
//     localStorage.setItem('theme', theme);
//     this.applyTheme(theme);
//   }

//   applyTheme(theme) {
//     const root = document.documentElement;
    
//     if (theme === THEMES.SYSTEM) {
//       this.applySystemTheme();
//     } else if (theme === THEMES.DARK) {
//       root.setAttribute('data-theme', 'dark');
//     } else {
//       root.setAttribute('data-theme', 'light');
//     }
//   }

//   applySystemTheme() {
//     const root = document.documentElement;
//     const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//     root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
//   }

//   getCurrentTheme() {
//     return this.currentTheme;
//   }
// }


// ============================================
// THEME MANAGEMENT
// ============================================

export const THEME_COLORS = {
  // Dark Theme
  bgPrimary: '#0f0f1e',
  bgSecondary: '#1a1a2e',
  bgTertiary: '#252538',
  bgCard: '#1e1e32',
  
  // Text Colors
  textPrimary: '#ffffff',
  textSecondary: '#a0a0b8',
  textTertiary: '#707089',
  
  // Accent Colors
  pink: '#ff6b9d',
  purple: '#c06cff',
  blue: '#5b9cff',
  green: '#4ade80',
  red: '#ff4757',
  orange: '#ffa502',
  
  // Gradients
  gradientPink: 'linear-gradient(135deg, #ff6b9d 0%, #c06cff 100%)',
  gradientPurple: 'linear-gradient(135deg, #c06cff 0%, #6c5dd3 100%)',
  gradientButton: 'linear-gradient(135deg, #ff1744 0%, #ff6b9d 50%, #c06cff 100%)'
};

export class ThemeManager {
  constructor() {
    this.currentTheme = 'dark';
  }

  applyTheme(theme = 'dark') {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      Object.entries(THEME_COLORS).forEach(([key, value]) => {
        const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVar, value);
      });
    }
    
    this.currentTheme = theme;
  }

  getColor(colorName) {
    return THEME_COLORS[colorName] || THEME_COLORS.pink;
  }

  init() {
    this.applyTheme('dark');
  }
}

// Create and export instance
const themeManager = new ThemeManager();
export default themeManager;