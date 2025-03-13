import React, { useEffect, useRef } from 'react';
import styles from '@/styles/Demo.module.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-javascript';

// A reusable component for displaying syntax-highlighted code
const CodeHighlight = ({ code }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <div className={styles.codeExample}>
      <h3>Code Example:</h3>
      <pre className="language-jsx">
        <code ref={codeRef} className="language-jsx">
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeHighlight;
