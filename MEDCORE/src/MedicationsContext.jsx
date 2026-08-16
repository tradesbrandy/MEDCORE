import{createContext,useContext, useState,useEffect }from "react";

const MedicationsContext=createContext();
const API_URL="http://localhost:3001/medications";

export function MedicationsProvider({ children }){
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    fetch(API_URL)
      .then((res) =>{
        if (!res.ok) throw new Error("Failed to fetch medications");
        return res.json();
      })
      .then(setMedications)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function addMedication(newMed){
    return fetch(API_URL,{
      method: "POST",
      headers: {"Content-Type":"application/json" },
      body: JSON.stringify(newMed),
    })
      .then((res) => res.json())
      .then((created) => setMedications((prev) => [...prev, created]));
  }

  function updateMedication(id, updates) {
    return fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
      .then((res) => res.json())
      .then((updated) =>
      setMedications((prev) => prev.map((m) => (m.id === updated.id ? updated : m)))
      );
  }

  function deleteMedication(id){
    return fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() =>
    setMedications((prev) => prev.filter((m) => m.id !== id))
    );
  }

  return (
    <MedicationsContext.Provider
    value={{medications,loading,error, addMedication, updateMedication, deleteMedication }}
    >
      {children}
    </MedicationsContext.Provider>
  );
}

export function useMedications() {
  return useContext(MedicationsContext);
}