'use client';

import { useEffect, useRef } from 'react';
import './LivePreview.css'; // Link the CSS file

type LivePreviewProps = {
  code: string;
};

export default function LivePreview({ code }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
      }
    }
  }, [code]);

  return (
    <div className="preview-container">
      <div className="preview-header">Live Preview</div>
      <iframe ref={iframeRef} className="preview-frame" title="Live Preview" />
    </div>
  );
}
