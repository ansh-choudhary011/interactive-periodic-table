import { useState } from "react";
import { motion } from "framer-motion";
import { elements } from "../data/elementsData";
import "../styles/periodicTable.css";

const PeriodicTable = ({ onElementClick }) => {
  const [search, setSearch] = useState("");
  const [hoveredElement, setHoveredElement] = useState(null);

  // Filter elements based on search
  const filteredElements = elements.filter(
    (el) =>
      el.name.toLowerCase().includes(search.toLowerCase()) ||
      el.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // Separate elements
  const mainElements = filteredElements.filter(
    (el) => (el.atomicNumber < 57) || (el.atomicNumber > 71 && el.atomicNumber < 89) || el.atomicNumber > 103
  );

  const lanthanoids = filteredElements.filter(
    (el) => el.atomicNumber >= 57 && el.atomicNumber <= 71
  );

  const actinoids = filteredElements.filter(
    (el) => el.atomicNumber >= 89 && el.atomicNumber <= 103
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or symbol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Main Periodic Table Grid */}
      <div className="periodic-table">
        {mainElements.map((el) => (
          <motion.div
            key={el.atomicNumber}
            style={{
              gridColumn: el.group,
              gridRow: el.period,
            }}
            className={`element ${el.category}`}
            onClick={() => onElementClick(el)}
            onMouseEnter={() => setHoveredElement(el)}
            onMouseLeave={() => setHoveredElement(null)}
            whileHover={{ scale: 1.2, boxShadow: "0 0 25px rgba(255,255,255,0.8)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="atomic-number">{el.atomicNumber}</span>
            <h2>{el.symbol}</h2>
            <p className="name">{el.name}</p>

            {/* Tooltip */}
            {hoveredElement?.atomicNumber === el.atomicNumber && (
              <motion.div
                className={`tooltip ${el.category}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <p>Group: {el.group}</p>
                <p>Period: {el.period}</p>
                <p>Electron: {el.electronConfig}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lanthanoids Row */}
      {lanthanoids.length > 0 && (
        <div className="periodic-table lanthanoids-row">
          <div className="series-container">
          <span className="series-label">* Lanthanides</span>
          {lanthanoids.map((el) => (
            <motion.div
              key={el.atomicNumber}
              className={`element ${el.category}`}
              onClick={() => onElementClick(el)}
              onMouseEnter={() => setHoveredElement(el)}
              onMouseLeave={() => setHoveredElement(null)}
              whileHover={{ scale: 1.2, boxShadow: "0 0 25px rgba(255,255,255,0.8)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="atomic-number">{el.atomicNumber}</span>
              <h2>{el.symbol}</h2>
              <p className="name">{el.name}</p>

              {/* Tooltip */}
              {hoveredElement?.atomicNumber === el.atomicNumber && (
                <motion.div
                  className={`tooltip ${el.category}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p>Group: {el.group}</p>
                  <p>Period: {el.period}</p>
                  <p>Electron: {el.electronConfig}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
          </div>
        </div>
      )}

      {/* Actinoids Row */}
      {actinoids.length > 0 && (
        <div className="periodic-table actinoids-row">
          <div className="series-container">
          <span className="series-label">** Actinides</span>
          {actinoids.map((el) => (
            <motion.div
              key={el.atomicNumber}
              className={`element ${el.category}`}
              onClick={() => onElementClick(el)}
              onMouseEnter={() => setHoveredElement(el)}
              onMouseLeave={() => setHoveredElement(null)}
              whileHover={{ scale: 1.2, boxShadow: "0 0 25px rgba(255,255,255,0.8)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="atomic-number">{el.atomicNumber}</span>
              <h2>{el.symbol}</h2>
              <p className="name">{el.name}</p>

              {/* Tooltip */}
              {hoveredElement?.atomicNumber === el.atomicNumber && (
                <motion.div
                  className={`tooltip ${el.category}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p>Group: {el.group}</p>
                  <p>Period: {el.period}</p>
                  <p>Electron: {el.electronConfig}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;
