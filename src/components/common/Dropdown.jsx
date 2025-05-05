"use client";

import { useState, useRef, useEffect } from "react";

function Dropdown({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!open);

  const ClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", ClickOutside);
    return () => document.removeEventListener("mousedown", ClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-gray-500 hover:text-gray-700"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-300 rounded-[8px] text-secondary-500 text-sm z-10">
          <button
            className="block w-full px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
          >
            수정하기
          </button>
          <button
            className="block w-full px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
