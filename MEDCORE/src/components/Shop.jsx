import {useState,useId,useRef} from "react";
import{useMedications} from "./MedicationsContext";

function Shop(){
    const {medications,loading,error,deleteMedication}=useMedications();
    const [search,setSearch]=useState("");
    const [selectedCategories,setSelectedCategories]=useState([]);
    const searchId=useId();
    const searchInputRef=useRef(null)

    const categories=["Pain Relief","Allergy","Vitamins","Antibiotics"];

    function toggleCategory(cat){
        setSelectedCategories((prev)=>
            prev.includes(cat) ? prev.filter((c)=> c !== cat ) : [...prev,cat] );
    }

function clearFilters(){
    setSearch("");
    setSelectedCategories([]);
    searchInputRef.current.focus();
}

const filteredMeds= medications.filter((med)=>{
    const matchesSearch=med.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory= selectedCategories.length===0 || selectedCategories.includes(med.category);
    return matchesSearch && matchesCategory;
});

if (loading)return<p className="p-6 text-gray-500">Loading medications...</p>;
if (error)return<p className="p-6 text-red-500">Error:{error}</p>;

return(<div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="w-full md:w-48 flex-shrink-0">
     <label htmlFor={searchId} className="sr-only">Search medications</label>
     <input
         id={searchId}
        ref={searchInputRef}
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 rounded-full border border-gray-300 mb-4 text-sm"
        />
        <div className="space-y-2">
          {categories.map((cat)=> (
        <label key={cat} className="flex items-center gap-2 text-sm text-gray-700">
        <input
         type="checkbox"
         checked={selectedCategories.includes(cat)}
         onChange={()=> toggleCategory(cat)}
         className="rounded"
          />
          {cat}
            </label>
          ))}
        </div>
        <button onClick={clearFilters}className="mt-4 text-xs text-blue-600 underline">
          Clear filters
        </button>
      </div>

      <div className="flex flex-wrap gap-4 flex-1">
        {filteredMeds.map((med)=> (
        <div key={med.id} className="w-40 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <h3 className="font-semibold text-gray-800">{med.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{med.description}</p>
        <p className="text-sm text-gray-500">{med.category}</p>
        <p className="text-sm font-medium mt-2">${med.price}</p>
         <button onClick={() => deleteMedication(med.id)} className="mt-2 text-xs text-red-500 underline">
           Remove
        </button>
        </div>
        ))}
        {filteredMeds.length===0 && (
          <p className="text-gray-500 text-sm">No medications match your search.</p>
        )}
    </div>
    </div>

);
}

export default Shop;