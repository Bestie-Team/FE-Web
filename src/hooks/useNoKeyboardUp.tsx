import { useEffect } from "react";

export default function useNoKeyboardUp() {
  useEffect(() => {
    const element = document.querySelector(".react-select__input");

    const handleFocus = (e: Event) => (e as FocusEvent).preventDefault();

    if (element) {
      element.addEventListener("focus", handleFocus);
    }

    return () => {
      if (element) {
        element.removeEventListener("focus", handleFocus); // Clean up
      }
    };
  }, []);
}
