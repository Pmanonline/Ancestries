// src/components/TawkToScript.js
import { useEffect } from "react";

const TawkToScript = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/66c77ce7ea492f34bc0917a5/1i5tjvqd0";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TawkToScript;
