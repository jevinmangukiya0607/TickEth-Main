import CloseIcon from 'assets/CloseIcon';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
  children,
  isOpen,
  onClose,
  hideClose = false,
}) {
  const modalRef = useRef(null);
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === 'Escape') onClose();
    }
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target))
        onClose();
    }
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return isOpen
    ? createPortal(
        <>
          <div className="fixed inset-0 bg-black/50 z-50" />
          <div
            className="fixed top-1/2 left-1/2 bg-white p-6 -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg"
            ref={modalRef}
          >
            {!hideClose && (
              <button onClick={onClose} className="absolute top-0 right-0 p-2">
                <CloseIcon />
              </button>
            )}
            {children}
          </div>
        </>,
        document.getElementById('portal')
      )
    : null;
}
