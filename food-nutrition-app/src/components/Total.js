import React from 'react';


const Total = ({ usdaNutrients, vitaminNutrients, otherNutrients }) => {
  const calories = usdaNutrients.find(nutrient => nutrient.name === "Energy")?.amount.toFixed(2) || "N/A";

  return (
    <div className="nutrition-label">
      <h2>Total Nutrients</h2>

      <div className="calories">
        <span>Calories</span>
        <span>{calories}</span>
      </div>
      <div className="nutrition-facts">
        <h3>Nutrition Facts</h3>
        {usdaNutrients.map((nutrient, index) => (
          <div key={index} className="nutrition-item">
            <span>{nutrient.name}</span>
            <span>{nutrient.amount.toFixed(2)}</span>
          </div>
        ))}

        <h4>Vitamins</h4>
        {vitaminNutrients.map((nutrient, index) => (
          <div key={index} className="nutrition-item">
            <span>{nutrient.name}</span>
            <span>{nutrient.amount.toFixed(2)}</span>
          </div>
        ))}

        {otherNutrients.length > 0 && (
          <>
            <h4>Other Nutrients</h4>
            {otherNutrients.map((nutrient, index) => (
              <div key={index} className="nutrition-item">
                <span>{nutrient.name}</span>
                <span>{nutrient.amount.toFixed(2)}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Total;
