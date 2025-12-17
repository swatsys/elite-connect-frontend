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

export class Toast {
  static show(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) {
      console.error('Toast container not found');
      return;
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = {
      info: 'ℹ️',
      success: '✅',
      error: '❌',
      warning: '⚠️'
    }[type] || 'ℹ️';
    
    toast.innerHTML = `
      <span style="font-size: 1.25rem;">${icon}</span>
      <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });
    
    // Remove after duration
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 300);
    }, duration);
  }
  
  static info(message, duration) {
    this.show(message, 'info', duration);
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

  static loading(message) {
    return this.show(message, 'info', 10000); // Long duration for loading
  }
}

// Add toast styles
const style = document.createElement('style');
style.textContent = `
  #toast-container {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: calc(100% - 2rem);
    max-width: 500px;
    pointer-events: none;
  }

  .toast {
    padding: 1rem 1.5rem;
    border-radius: 12px;
    color: white;
    font-weight: 500;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.3s ease;
    pointer-events: auto;
  }

  .toast-info {
    background: linear-gradient(135deg, #5b9cff 0%, #4285f4 100%);
  }

  .toast-success {
    background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  }

  .toast-error {
    background: linear-gradient(135deg, #ff4757 0%, #ef4444 100%);
  }

  .toast-warning {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  }
`;

if (document.head) {
  document.head.appendChild(style);
} else {
  document.addEventListener('DOMContentLoaded', () => {
    document.head.appendChild(style);
  });
}

export default Toast;