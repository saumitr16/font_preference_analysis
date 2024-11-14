import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "Male",
    usageFrequency: "Never",
    usageContext: "Professional",
    preferredFontSize: "",
  });
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Font Usage Prediction</h1>
        <p>Enter your data below to predict font usage patterns.</p>
      </header>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="15"
            max="60"
            required
          />
        </label>
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          Usage Frequency:
          <select
            name="usageFrequency"
            value={formData.usageFrequency}
            onChange={handleChange}
          >
            <option value="Never">Never</option>
            <option value="Rarely">Rarely</option>
            <option value="Sometimes">Sometimes</option>
            <option value="Often">Often</option>
            <option value="Always">Always</option>
          </select>
        </label>
        <label>
          Usage Context:
          <select
            name="usageContext"
            value={formData.usageContext}
            onChange={handleChange}
          >
            <option value="Professional">Professional</option>
            <option value="Personal">Personal</option>
            <option value="Educational">Educational</option>
          </select>
        </label>
        <label>
          Preferred Font Size:
          <input
            type="number"
            name="preferredFontSize"
            value={formData.preferredFontSize}
            onChange={handleChange}
            min="8"
            max="32"
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {result && <div className="result">{result}</div>}
      <footer className="footer">
        <p>Project Members: Aatif Ahmad and Saumitra Agrawal</p>
      </footer>
    </div>
  );
}

export default App;
