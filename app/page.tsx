 "use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function Home() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(320);
  const [foreground, setForeground] = useState("#111111");
  const [background, setBackground] = useState("#ffffff");
  const [qr, setQr] = useState("");

  useEffect(() => {
    generateQR();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, size, foreground, background]);

  async function generateQR() {
    try {
      const dataUrl = await QRCode.toDataURL(text || " ", {
        width: size,
        margin: 2,
        color: {
          dark: foreground,
          light: background,
        },
        errorCorrectionLevel: "M",
      });
      setQr(dataUrl);
    } catch {
      setQr("");
    }
  }

  function downloadQR() {
    if (!qr) return;
    const link = document.createElement("a");
    link.href = qr;
    link.download = "quickqr.png";
    link.click();
  }

  async function copyQR() {
    if (!qr) return;
    try {
      const response = await fetch(qr);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      alert("QR code copied to clipboard.");
    } catch {
      alert("Your browser does not allow image clipboard access.");
    }
  }

  return (
    <main className="page">
      <section className="shell">
        <header className="header">
          <div>
            <div className="eyebrow">QUICKQR</div>
            <h1>QR Code Generator</h1>
            <p>Create a clean QR code in seconds. No account. No server.</p>
          </div>
        </header>

        <div className="grid">
          <section className="card controls">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a URL, text, phone number, Wi-Fi details..."
              rows={6}
            />

            <div className="row">
              <div className="field">
                <label htmlFor="size">Size</label>
                <select
                  id="size"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                >
                  <option value={200}>200 × 200</option>
                  <option value={320}>320 × 320</option>
                  <option value={500}>500 × 500</option>
                  <option value={800}>800 × 800</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="foreground">QR color</label>
                <input
                  id="foreground"
                  type="color"
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="background">Background</label>
                <input
                  id="background"
                  type="color"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                />
              </div>
            </div>

            <button className="primary" onClick={generateQR}>
              Generate QR
            </button>
          </section>

          <section className="card preview">
            <div className="preview-title">
              <span>Preview</span>
              <span className="status">● LIVE</span>
            </div>

            <div className="qr-wrap">
              {qr ? (
                <img src={qr} alt="Generated QR code" />
              ) : (
                <div className="empty">Enter some content</div>
              )}
            </div>

            <div className="actions">
              <button onClick={downloadQR} disabled={!qr}>
                Download PNG
              </button>
              <button onClick={copyQR} disabled={!qr}>
                Copy Image
              </button>
            </div>
          </section>
        </div>

        <footer>
          Everything happens in your browser. Your content is not uploaded.
        </footer>
      </section>
    </main>
  );
}