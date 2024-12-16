import { useEffect } from "react";

export default function useNoKeyboardUp() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const elements = document.querySelectorAll(".react-select__input");
      elements.forEach((element) => {
        element.addEventListener("focus", (e: Event) =>
          (e as FocusEvent).preventDefault()
        );
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);
}
