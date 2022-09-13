import { useEffect, useRef, useState } from "react";

// type Menu = HTMLDivElement & HTMLLIElement & HTMLFormElement;

const useOutSideClick = () => {
  const [isActive, setActive] = useState(false);

  const menuRef = useRef(null);

  const toggleActive = () => {
    setActive((pre) => !pre);
  };

  useEffect(() => {
    const handler = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef]);

  return {
    isActive,
    setActive,
    menuRef,
    toggleActive,
  };
};

export default useOutSideClick;