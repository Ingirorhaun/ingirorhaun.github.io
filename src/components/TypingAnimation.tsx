import React, { useState, useEffect, useMemo, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';

const TypingAnimation: React.FC = () => {
  const codeLines = useMemo(() => [
    "import React, { useState, useEffect } from 'react';",
    "",
    "const Header: React.FC = () => {",
    "  const [isAtTop, setIsAtTop] = useState(true);",
    "  const [activeSection, setActiveSection] = useState('/');",
    "",
    "  useEffect(() => {",
    "    const handleScroll = () => setIsAtTop(window.scrollY === 0);",
    "    window.addEventListener('scroll', handleScroll);",
    "    return () => window.removeEventListener('scroll', handleScroll);",
    "  }, []);",
    "",
    "  return (",
    "    <div className={`header${isAtTop ? ' transparent' : ''}`}>",
    "      <nav>",
    "        <a href='/'>Home</a>",
    "        <a href='/#projects'>Projects</a>",
    "      </nav>",
    "    </div>",
    "  );",
    "};"
  ], []);

  const [displayText, setDisplayText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (lineIndex < codeLines.length) {
      const currentLine = codeLines[lineIndex];
      if (charIndex < currentLine.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + currentLine[charIndex]);
          setCharIndex(charIndex + 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + '\n');
          setLineIndex(lineIndex + 1);
          setCharIndex(0);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [lineIndex, charIndex, codeLines]);

  useEffect(() => {
    if (preRef.current) {
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [displayText]);

  // Use Prism to highlight the code
  const highlighted = Prism.highlight(displayText, Prism.languages.typescript, 'typescript');

  return (
    <pre data-testid="typing-animation" ref={preRef} className="typing-animation">
      <code
        className="language-typescript"
        dangerouslySetInnerHTML={{
          __html: highlighted + `<span style="opacity: ${lineIndex < codeLines.length ? 1 : 0}">|</span>`
        }}
      />
    </pre>
  );
};

export default TypingAnimation;