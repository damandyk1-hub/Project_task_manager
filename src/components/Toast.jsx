import React, { useEffect } from 'react';

function Toast({ message, type = 'info', onClose, duration = 5000 }) {
    useEffect(() => {
        if (duration && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'warning':
                return '⚠';
            default:
                return 'ℹ';
        }
    };

    const getColor = () => {
        switch (type) {
            case 'success':
                return '#28a745';
            case 'error':
                return '#dc3545';
            case 'warning':
                return '#ffc107';
            default:
                return '#17a2b8';
        }
    };

    return (
        <div
            className="toast-notification"
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 9999,
                minWidth: '300px',
                maxWidth: '500px',
                backgroundColor: 'white',
                borderLeft: `4px solid ${getColor()}`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                borderRadius: '4px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                animation: 'slideInRight 0.3s ease-out'
            }}
        >
            <div
                className="toast-icon"
                style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: getColor(),
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    flexShrink: 0
                }}
            >
                {getIcon()}
            </div>
            <div className="toast-message" style={{ flex: 1, fontSize: '14px', color: '#333' }}>
                {message}
            </div>
            <button
                onClick={onClose}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    color: '#999',
                    cursor: 'pointer',
                    padding: '0',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}
            >
                ×
            </button>
            <style>{`
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}

export default Toast;
