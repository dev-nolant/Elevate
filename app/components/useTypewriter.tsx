import React, { useState, useEffect } from 'react';

const useTypewriter = (texts: string[], typingSpeed = 100, deletingSpeed = 50, pause = 2000) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedTextIndex, setDisplayedTextIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      if (isDeleting) {
        setText((prev) => prev.slice(0, prev.length - 1));
      } else {
        setText((prev) => texts[displayedTextIndex].slice(0, prev.length + 1));
      }

      if (!isDeleting && text === texts[displayedTextIndex]) {
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setDisplayedTextIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timeoutId = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, typingSpeed, deletingSpeed, texts, displayedTextIndex, pause]);

  return text;
};

export default useTypewriter;
