// class Toast {
//   static show(message, type = 'info') {
//     const toast = document.createElement('div');
//     toast.className = `toast toast-${type}`;
//     toast.textContent = message;
//     toast.style.cssText = `
//       position: fixed;
//       top: 20px;
//       right: 20px;
//       padding: 15px 20px;
//       background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
//       color: white;
//       border-radius: 8px;
//       box-shadow: 0 4px 6px rgba(0,0,0,0.1);
//       z-index: 10000;
//       animation: slideIn 0.3s ease-out;
//     `;
    
//     document.body.appendChild(toast);
    
//     setTimeout(() => {
//       toast.style.animation = 'slideOut 0.3s ease-in';
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

// export default Toast;


// Simple toast notification system
export class Toast {
  static show(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${this.getColor(type)};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 9999;
      animation: slideIn 0.3s ease;
      max-width: 300px;
      font-weight: 500;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  static getColor(type) {
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };
    return colors[type] || colors.info;
  }

  static success(message) {
    this.show(message, 'success');
  }

  static error(message) {
    this.show(message, 'error');
  }

  static warning(message) {
    this.show(message, 'warning');
  }

  static info(message) {
    this.show(message, 'info');
  }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);