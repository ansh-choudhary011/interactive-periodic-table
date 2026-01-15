import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

// Orbital colors
const orbitalColors = {
  s: "#f59e0b", // Amber
  p: "#3b82f6", // Blue
  d: "#10b981", // Green
  f: "#8b5cf6", // Purple
};

// Parse electron configuration
const parseElectronConfig = (config) => {
  if (!config) return [];

  // Remove noble gas shorthand like [He]
  const cleaned = config.replace(/\[.*?\]\s*/g, "");
  const parts = cleaned.split(" ");

  return parts
    .map((p) => {
      const match = p.match(/(\d+)([spdf])(\d+)/);
      if (!match) return null;
      const [, n, type, count] = match;
      return { n, type, count: Number(count) };
    })
    .filter(Boolean);
};

const ElementModal = ({ element, onClose }) => {
  const orbitals = element ? parseElectronConfig(element.electronConfig) : [];

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = element ? "hidden" : "auto";
  }, [element]);

  return (
    <AnimatePresence>
      {element && (
        <motion.div
          className="modal-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`modal-content ${element.category}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            {/* ===== HEADER ===== */}
            <div className="modal-header">
              <div className="symbol-box">
                <h1>{element.symbol}</h1>
                <span>{element.atomicNumber}</span>
              </div>

              <div className="header-info">
                <h2>{element.name}</h2>
                <p className="category">
                  {element.category.replace(/-/g, " ")}
                </p>
              </div>
            </div>

            {/* ===== BODY ===== */}
            <div className="modal-grid">
              {/* LEFT COLUMN */}
              <div className="info-section">
                <p><strong>Atomic Mass:</strong> {element.atomicMass}</p>
                <p><strong>Group:</strong> {element.group}</p>
                <p><strong>Period:</strong> {element.period}</p>
                <p><strong>Phase:</strong> {element.phase || "Unknown"}</p>
                <p>
                  <strong>Atomic Radius:</strong>{" "}
                  {element.atomicRadius || "N/A"}
                </p>
                <p>
                  <strong>Discovery Year:</strong>{" "}
                  {element.discoveryYear || "Unknown"}
                </p>
              </div>

              {/* RIGHT COLUMN */}
              <div className="visual-section">
                <p className="electron-title">Electron Configuration</p>
                <p className="electron-config">
                  {element.electronConfig}
                </p>

                <div className="electron-visual">
                  {orbitals.map((orb, i) => (
                    <div key={i} className="orbital-row">
                      <span className="orbital-label">
                        {orb.n}{orb.type}
                      </span>

                      <div className="electron-dots">
                        {Array.from({ length: orb.count }).map((_, idx) => (
                          <span
                            key={idx}
                            className="electron-dot"
                            style={{
                              backgroundColor:
                                orbitalColors[orb.type],
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ===== USES ===== */}
            <div className="uses-section">
              <h4>Uses</h4>
              <p>{element.uses || "Information not available."}</p>
            </div>

            {/* ===== FOOTER ===== */}
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ElementModal;
