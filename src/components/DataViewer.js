import React, { useState, useEffect } from "react";
import { firestore, collection, getDocs } from "../firebase";

const DataEntry = () => {
  const [selectedCollection, setSelectedCollection] = useState("");
  const [filteredValues, setFilteredValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCollection) {
          // Retrieve values from Firestore for selected collection
          const collectionRef = collection(firestore, selectedCollection);
          const querySnapshot = await getDocs(collectionRef);
          const values = querySnapshot.docs.map((doc) => doc.data());
          setFilteredValues(values);
        } else {
          setFilteredValues([]);
        }
      } catch (error) {
        console.error(
          `Error retrieving ${selectedCollection} data from Firestore:`,
          error
        );
      }
    };

    fetchData();
  }, [selectedCollection]);

  const handleFilterChange = (event) => {
    setSelectedCollection(event.target.value);
  };

  return (
    <div className="bg-white p-8">
      <h2 className="mb-4 text-2xl font-bold">Data Viewer</h2>
      <div className="mb-4">
        <label htmlFor="filterCollection" className="mb-2 block font-bold">
          Select Agricultral Product
        </label>
        <select
          id="filterCollection"
          name="filterCollection"
          value={selectedCollection}
          onChange={handleFilterChange}
          className="border border-gray-300 p-2"
        >
          <option value="">Select Product</option>
          <option value="BiologyBalance">Biology Balance</option>
          <option value="Canola">Canola</option>
          <option value="CationBalance">Cation Balance</option>
          <option value="ChineseCabbage">Chinese Cabbage</option>
          <option value="Corn">Corn</option>
          <option value="Cotton">Cotton</option>
          <option value="Crop">Crop</option>
          <option value="Flowers">Flowers</option>
          <option value="Forage">Forage</option>
          <option value="NutrientBalance">Nutrient Balance</option>
          <option value="OilPalm">Oil Palm</option>
          <option value="Other">Other</option>
          <option value="PaddyGrain">Paddy Grain</option>
          <option value="Peanut">Peanut</option>
          <option value="Poppy">Poppy</option>
          <option value="Sorghum">Sorghum</option>
          <option value="Sugarcane">Sugarcane</option>
          <option value="Tea">Tea</option>
          <option value="Tobacco">Tobacco</option>
          <option value="Tree">Tree</option>
          <option value="Wheat">Wheat</option>
          <option value="WildCabbage">Wild Cabbage</option>
        </select>
      </div>
      {filteredValues.length > 0 && (
        <div className="w-screen overflow-x-auto">
          <h3 className="mt-4 text-lg font-bold">Filtered Values</h3>
          <table className="mt-2 border-collapse border border-gray-300 ">
            <thead>
              <tr>
                {/* Assuming all objects have the same keys */}
                {Object.keys(filteredValues[0]).map((key) => (
                  <th
                    key={key}
                    className="border border-gray-300 px-4 py-2 text-sm font-bold text-gray-700"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredValues.map((value, index) => (
                <tr key={index}>
                  {Object.values(value).map((val, idx) => (
                    <td
                      key={idx}
                      className="border border-gray-300 px-4 py-2 text-sm"
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataEntry;
