import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10);

    // Auto-hide after duration
    const hideTimer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(hideTimer);
  }, [duration, onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: `translateX(-50%) translateY(${isVisible && !isLeaving ? '0' : '-100px'})`,
        background: 'rgba(0, 0, 0, 0.85)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        fontSize: '14px',
        fontWeight: 500,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        opacity: isVisible && !isLeaving ? 1 : 0,
        zIndex: 1000,
        maxWidth: '90vw',
        textAlign: 'center'
      }}
    >
      {message}
    </div>
  );
};

// Toast Manager Component
interface ToastManagerProps {
  children: React.ReactNode;
}

interface ToastItem {
  id: number;
  message: string;
}

export const ToastContext = React.createContext<{
  showToast: (message: string) => void;
}>({
  showToast: () => {}
});

export const ToastProvider: React.FC<ToastManagerProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [nextId, setNextId] = useState(0);

  const showToast = (message: string) => {
    const id = nextId;
    setNextId(prev => prev + 1);
    setToasts(prev => [...prev, { id, message }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, pointerEvents: 'none', zIndex: 1000 }}>
        {toasts.map((toast, index) => (
          <div key={toast.id} style={{ pointerEvents: 'auto', marginTop: `${index * 60}px` }}>
            <Toast
              message={toast.message}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};