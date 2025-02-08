"use client";

import { useState, useEffect } from "react";

export function useNewUserCheck() {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get("ref");
    if (refParam === "signup") {
      setIsNew(true);
      console.log("from signup");
    }
  }, []);

  return { isNew, setIsNew };
}
