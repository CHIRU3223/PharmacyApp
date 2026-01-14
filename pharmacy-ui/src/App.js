import './App.css';
import { useState, useEffect } from 'react';
import MedicineList from './components/MedicineList';
import AddMedicine from './components/AddMedicine';

function App() {
  const [medicines, setMedicines] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [addMedicinePopup, setAddMedicinePopup] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  
  const loadMedicines = () => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setMedicines(data))
      .catch(error => console.error('Error fetching medicines:', error));
  };
  useEffect(() => {
    loadMedicines();
  }, []); 

  const handleAddMedicineButtonPopup = () => {
    setAddMedicinePopup(true);
  };
  const addMedicine = (medicine) => {
    // Return the fetch promise so callers can wait for completion.
    return fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(medicine)
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to add medicine');
        // assume server returns the created medicine object
        return response.json();
      })
      .then(created => {
        // update local state so the list reflects the new medicine immediately
        setMedicines(prev => [...prev, created]);
        alert("Medicine added " + (created.name || ""));
        return created;
      })
      .catch(error => {
        console.error('Error adding medicine:', error);
        throw error;
      });
  };

  return (
    <div className="App">
      <h1>Medicines List for ABC Pharmacy</h1>
      {
        !addMedicinePopup && <>
          <div className="controls">
            <input
              type="text"
              id="searchBox"
              placeholder="Search medicines..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={handleAddMedicineButtonPopup}>+ Add Medicine</button>

          </div>
          <MedicineList medicines={medicines} searchText={searchText} />
        </>
      }
      {addMedicinePopup && <AddMedicine addMedicine={addMedicine} setAddMedicinePopup={setAddMedicinePopup} />}
    </div>
  );
}

export default App;
