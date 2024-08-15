import React, { useState } from 'react';
import './Total.css'; 

const Total = ({ usdaNutrients, vitaminNutrients, otherNutrients,totalCalories }) => {
  const [expanded, setExpanded] = useState(false);


  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  console.log("USDA Nutrients:", usdaNutrients);

  const calories = totalCalories || "N/A";
  const fat = usdaNutrients.find(nutrient => nutrient.name === "Total lipid (fat)")?.amount.toFixed(2) || "N/A";
  const sodium = usdaNutrients.find(nutrient => nutrient.name === "Sodium, Na")?.amount.toFixed(2) || "N/A";
  const carbs = usdaNutrients.find(nutrient => nutrient.name === "Carbohydrate, by difference")?.amount.toFixed(2) || "N/A";
  const protein = usdaNutrients.find(nutrient => nutrient.name === "Protein")?.amount.toFixed(2) || "N/A";

  return (
    <div className="nutrition-label">
      <h2>Total Nutrients</h2>

      <div className="calories">
        <span>Calories</span>
        <span>{calories}</span>
      </div>

      <div className="nutrition-facts">
        <div className="nutrition-item">
          <span>Total Fat</span>
          <span>{fat}g</span>
        </div>
        <div className="nutrition-item">
          <span>Sodium</span>
          <span>{sodium}mg</span>
        </div>
        <div className="nutrition-item">
          <span>Total Carbohydrate</span>
          <span>{carbs}g</span>
        </div>
        <div className="nutrition-item">
          <span>Protein</span>
          <span>{protein}g</span>
        </div>
        
        {expanded && (
          <>
            <h4>Vitamins</h4>
            {vitaminNutrients.map((nutrient, index) => (
              <div key={index} className="nutrition-item">
                <span>{nutrient.name}</span>
                <span>{nutrient.amount.toFixed(2)}g</span>
              </div>
            ))}

            {otherNutrients.length > 0 && (
              <>
                <h4>Other Nutrients</h4>
                {otherNutrients.map((nutrient, index) => (
                  <div key={index} className="nutrition-item">
                    <span>{nutrient.name}</span>
                    <span>{nutrient.amount.toFixed(2)}g</span>
                  </div>
                ))}
              </>
            )}
          </>
        )}

        <div className="nutrition-item">
          <button className="view-more" onClick={toggleExpanded}>
            {expanded ? 'View Less' : 'View More'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Total;
