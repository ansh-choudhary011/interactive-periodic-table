import { useState } from "react";
import PeriodicTable from "./periodic-table/components/PeriodicTable";
import ElementModal from "./periodic-table/components/ElementModal";

function App() {
  const [selectedElement, setSelectedElement] = useState(null);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Periodic Table
      </h1>

      <PeriodicTable onElementClick={setSelectedElement} />

      <ElementModal 
        element={selectedElement} 
        onClose={() => setSelectedElement(null)} 
      />
    </div>
  );
}

export default App;
