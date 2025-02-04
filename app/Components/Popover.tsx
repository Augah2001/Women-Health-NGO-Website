import React, { useState, useRef, useEffect, ReactNode, MouseEvent } from 'react';

// Define the prop types for the Popover component
interface PopoverProps {
  content: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}

const Popover: React.FC<PopoverProps> = ({ content, children, disabled = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      e.stopPropagation();
      setIsOpen(true);
    }
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside as EventListener);
    document.addEventListener('touchstart', handleClickOutside as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as EventListener);
      document.removeEventListener('touchstart', handleClickOutside as EventListener);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div onMouseEnter={togglePopover} onMouseLeave={closePopover}>
        {children}
      </div>
      {isOpen && (
        <div className="absolute z-10 top-0  l w-24 bg-white border border-gray-200 rounded-sm shadow-lg">
          <div className="p-2 text-[10px] h-[14px]" >{content}</div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Popover content="Disabled popover" disabled>
        <button className="btn btn-primary" style={{ pointerEvents: 'none' }} type="button" disabled>
          Disabled button
        </button>
      </Popover>
    </div>
  );
};

export default Popover;
