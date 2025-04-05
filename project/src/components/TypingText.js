import React, { useState, useEffect } from "react";

const TypingText = ({text}) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return <h1 className="text-4xl font-bold">{displayText}</h1>;
};

export default TypingText;
