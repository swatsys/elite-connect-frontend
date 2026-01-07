// Theme management
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

export class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || THEMES.SYSTEM;
    this.applyTheme(this.currentTheme);
    
    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (this.currentTheme === THEMES.SYSTEM) {
          this.applySystemTheme();
        }
      });
    }
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  setTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme(theme);
  }

  applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === THEMES.SYSTEM) {
      this.applySystemTheme();
    } else if (theme === THEMES.DARK) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }
  }

  applySystemTheme() {
    const root = document.documentElement;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}