'use client';
import { useEffect, useRef } from 'react';

export default function LivePreview({ code }: { code: string }) {
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

  return <iframe ref={iframeRef} className="w-full h-[500px] border rounded-xl" />;
}
