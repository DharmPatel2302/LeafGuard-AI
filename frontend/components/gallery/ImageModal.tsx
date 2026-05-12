"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ImageRecord } from "@/lib/images";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ImageModalProps {
  image: ImageRecord | null;
  onClose: () => void;
}

function ModalContent({ image, onClose }: ImageModalProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setImgError(false);
    setImgLoaded(false);
  }, [image?.src]);

  const handleDownload = async () => {
    if (!image) return;
    try {
      const response = await fetch(image.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = image.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  if (!image) return null;

  const title =
    image.type === "disease" && image.diseaseName
      ? `${image.diseaseName} — ${image.category.charAt(0).toUpperCase() + image.category.slice(1)}`
      : `Healthy ${image.category.charAt(0).toUpperCase() + image.category.slice(1)}`;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        <motion.div
          key="modalbox"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "900px",
            maxHeight: "calc(100vh - 48px)",
            background: "#1c1917",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.09)",
              background: "#1c1917",
              boxSizing: "border-box",
            }}
          >
            <div style={{ minWidth: 0, flex: 1 }}>
              <h3
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "16px",
                  margin: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  color: "#78716c",
                  fontSize: "11px",
                  margin: "2px 0 0",
                  fontFamily: "monospace",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {image.filename}
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px", flexShrink: 0, marginLeft: "16px" }}>
              <button
                onClick={handleDownload}
                title="Download"
                style={{
                  width: 36, height: 36, borderRadius: "50%", border: "none",
                  cursor: "pointer", background: "#292524", color: "#d6d3d1",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s", flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#22c55e")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#292524")}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
              </button>
              <button
                onClick={onClose}
                title="Close"
                style={{
                  width: 36, height: 36, borderRadius: "50%", border: "none",
                  cursor: "pointer", background: "#292524", color: "#d6d3d1",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s", flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#ef4444")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#292524")}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
              </button>
            </div>
          </div>

          {/* IMAGE AREA */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#0c0a09",
              padding: "24px",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            {!imgLoaded && !imgError && (
              <div style={{
                position: "absolute",
                color: "#78716c",
                fontSize: "13px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 32, opacity: 0.5 }}>hourglass_top</span>
                <span style={{ opacity: 0.5 }}>Loading…</span>
              </div>
            )}

            {imgError && (
              <div style={{
                color: "#78716c",
                fontSize: "13px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                textAlign: "center",
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 40, color: "#ef4444", opacity: 0.7 }}>broken_image</span>
                <span>Image could not be loaded</span>
                <code style={{ fontSize: "11px", opacity: 0.5 }}>{image.src}</code>
              </div>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={title}
              onLoad={() => setImgLoaded(true)}
              onError={() => { setImgError(true); setImgLoaded(true); }}
              style={{
                display: imgError ? "none" : "block",
                maxWidth: "100%",
                maxHeight: "calc(100vh - 48px - 65px - 48px)",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                borderRadius: "6px",
                opacity: imgLoaded ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = image ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [image]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !image) return null;

  // Portal renders modal DIRECTLY inside <body>, completely bypassing
  // the flex/transform stacking context from layout.tsx that was
  // causing position:fixed to misalign.
  return createPortal(
    <ModalContent image={image} onClose={onClose} />,
    document.body
  );
}