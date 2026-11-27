"use client";

import { useState } from "react";

export default function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <>
      <button type="button" className="copy" onClick={copy}>
        {copied ? "Copied" : "Copy email"}
      </button>
      <span className="sr" role="status">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </>
  );
}
