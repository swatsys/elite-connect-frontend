// // Simple toast notification system
// export class Toast {
//   static show(message, type = 'info') {
//     const toast = document.createElement('div');
//     toast.className = `toast toast-${type}`;
//     toast.style.cssText = `
//       position: fixed;
//       top: 20px;
//       right: 20px;
//       background: ${this.getColor(type)};
//       color: white;
//       padding: 1rem 1.5rem;
//       border-radius: 12px;
//       box-shadow: 0 4px 12px rgba(0,0,0,0.2);
//       z-index: 9999;
//       animation: slideIn 0.3s ease;
//       max-width: 300px;
//       font-weight: 500;
//     `;
//     toast.textContent = message;
    
//     document.body.appendChild(toast);
    
//     setTimeout(() => {
//       toast.style.animation = 'slideOut 0.3s ease';
//       setTimeout(() => toast.remove(), 300);
//     }, 3000);
//   }

//   static getColor(type) {
//     const colors = {
//       success: '#10b981',
//       error: '#ef4444',
//       warning: '#f59e0b',
//       info: '#3b82f6'
//     };
//     return colors[type] || colors.info;
//   }

//   static success(message) {
//     this.show(message, 'success');
//   }

//   static error(message) {
//     this.show(message, 'error');
//   }

//   static warning(message) {
//     this.show(message, 'warning');
//   }

//   static info(message) {
//     this.show(message, 'info');
//   }
// }

// // Add CSS animations
// const style = document.createElement('style');
// style.textContent = `
//   @keyframes slideIn {
//     from {
//       transform: translateX(400px);
//       opacity: 0;
//     }
//     to {
//       transform: translateX(0);
//       opacity: 1;
//     }
//   }
  
//   @keyframes slideOut {
//     from {
//       transform: translateX(0);
//       opacity: 1;
//     }
//     to {
//       transform: translateX(400px);
//       opacity: 0;
//     }
//   }
// `;
// document.head.appendChild(style);


// class Toast {
//   static show(message, type = 'info') {
//     const toast = document.createElement('div');
//     toast.className = `toast toast-${type}`;
//     toast.textContent = message;
    
//     const colors = {
//       success: '#10b981',
//       error: '#ef4444',
//       warning: '#f59e0b',
//       info: '#3b82f6'
//     };
    
//     toast.style.cssText = `
//       position: fixed;
//       top: 20px;
//       right: 20px;
//       padding: 1rem 1.5rem;
//       background: ${colors[type] || colors.info};
//       color: white;
//       border-radius: 12px;
//       box-shadow: 0 4px 12px rgba(0,0,0,0.2);
//       z-index: 10000;
//       font-weight: 500;
//       max-width: 350px;
//       animation: slideIn 0.3s ease;
//     `;
    
//     document.body.appendChild(toast);
    
//     setTimeout(() => {
//       toast.style.animation = 'slideOut 0.3s ease';
//       setTimeout(() => toast.remove(), 300);
//     }, 3000);
//   }
  
//   static success(message) {
//     this.show(message, 'success');
//   }
  
//   static error(message) {
//     this.show(message, 'error');
//   }
  
//   static info(message) {
//     this.show(message, 'info');
//   }
  
//   static warning(message) {
//     this.show(message, 'warning');
//   }
// }

// // Add CSS animations
// if (!document.getElementById('toast-animations')) {
//   const style = document.createElement('style');
//   style.id = 'toast-animations';
//   style.textContent = `
//     @keyframes slideIn {
//       from {
//         transform: translateX(400px);
//         opacity: 0;
//       }
//       to {
//         transform: translateX(0);
//         opacity: 1;
//       }
//     }
    
//     @keyframes slideOut {
//       from {
//         transform: translateX(0);
//         opacity: 1;
//       }
//       to {
//         transform: translateX(400px);
//         opacity: 0;
//       }
//     }
//   `;
//   document.head.appendChild(style);
// }

// export default Toast;


// ============================================
// TOAST NOTIFICATIONS
// ============================================

// Simple toast notification system
// export class Toast {
//   static show(message, type = 'info') {
//     const toast = document.createElement('div');
//     toast.className = `toast toast-${type}`;
//     toast.style.cssText = `
//       position: fixed;
//       top: 20px;
//       right: 20px;
//       background: ${this.getColor(type)};
//       color: white;
//       padding: 1rem 1.5rem;
//       border-radius: 12px;
//       box-shadow: 0 4px 12px rgba(0,0,0,0.2);
//       z-index: 9999;
//       animation: slideIn 0.3s ease;
//       max-width: 300px;
//       font-weight: 500;
//     `;
//     toast.textContent = message;
    
//     document.body.appendChild(toast);
    
//     setTimeout(() => {
//       toast.style.animation = 'slideOut 0.3s ease';
//       setTimeout(() => toast.remove(), 300);
//     }, 3000);
//   }

//   static getColor(type) {
//     const colors = {
//       success: '#10b981',
//       error: '#ef4444',
//       warning: '#f59e0b',
//       info: '#3b82f6'
//     };
//     return colors[type] || colors.info;
//   }

//   static success(message) {
//     this.show(message, 'success');
//   }

//   static error(message) {
//     this.show(message, 'error');
//   }

//   static warning(message) {
//     this.show(message, 'warning');
//   }

//   static info(message) {
//     this.show(message, 'info');
//   }
// }

// // Add CSS animations
// const style = document.createElement('style');
// style.textContent = `
//   @keyframes slideIn {
//     from {
//       transform: translateX(400px);
//       opacity: 0;
//     }
//     to {
//       transform: translateX(0);
//       opacity: 1;
//     }
//   }
  
//   @keyframes slideOut {
//     from {
//       transform: translateX(0);
//       opacity: 1;
//     }
//     to {
//       transform: translateX(400px);
//       opacity: 0;
//     }
//   }
// `;
// document.head.appendChild(style);


// ✨ TOAST NOTIFICATION SYSTEM
// Shows success, error, warning, and info messages

// ✨ TOAST NOTIFICATION SYSTEM
// Shows success, error, warning, and info messages

export class Toast {
  static show(message, type = 'info', duration = 3000) {
    // Remove any existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Icon based on type
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    
    toast.innerHTML = `
      <span style="font-size:1.25rem;margin-right:0.5rem">${icons[type]}</span>
      <span>${message}</span>
    `;

    // Add to body
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after duration
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  static success(message, duration) {
    this.show(message, 'success', duration);
  }

  static error(message, duration) {
    this.show(message, 'error', duration);
  }

  static warning(message, duration) {
    this.show(message, 'warning', duration);
  }

  static info(message, duration) {
    this.show(message, 'info', duration);
  }
}

// Add toast styles dynamically
const style = document.createElement('style');
style.textContent = `
  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-primary);
    color: var(--text-primary);
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 16px var(--shadow);
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    z-index: 10000;
    transform: translateX(400px);
    opacity: 0;
    transition: all 0.3s ease;
    max-width: 400px;
  }

  .toast.show {
    transform: translateX(0);
    opacity: 1;
  }

  .toast-success {
    border-left: 4px solid var(--success);
  }

  .toast-error {
    border-left: 4px solid var(--error);
  }

  .toast-warning {
    border-left: 4px solid var(--warning);
  }

  .toast-info {
    border-left: 4px solid var(--info);
  }

  @media (max-width: 768px) {
    .toast {
      left: 20px;
      right: 20px;
      max-width: none;
    }
  }
`;
document.head.appendChild(style);

