import { USDA_REQUIRED_NUTRIENTS, VITAMIN_NUTRIENTS, compareNutrientsToDiet } from './Diets.js';
import { useState } from 'react';


const NutritionLabel = ({ result, servingSize, selectedDiet }) => {
    // State to manage showing more/less nutrients
    const [showAll, setShowAll] = useState(false);
  
    // Function to toggle the show all/less state
    const toggleShowAll = () => {
      setShowAll(!showAll);
    };
  
    // Function to get the nutrient value for a specific nutrient name
    const getNutrientValue = (result, nutrientName) => {
      const nutrient = result.foodNutrients.find(n => n.nutrient.name === nutrientName);
      if (!nutrient) return 'N/A';
      const originalServingSize = result.servingSize || 100;
      const adjustedAmount = (nutrient.amount * servingSize) / originalServingSize;
      return `${adjustedAmount.toFixed(2)} ${nutrient.nutrient.unitName}`;
    };
  
    // Filtering nutrients into categories
    const usdaNutrients = result.foodNutrients.filter(nutrient =>
      USDA_REQUIRED_NUTRIENTS.includes(nutrient.nutrient.name)
    );
  
    const vitaminNutrients = result.foodNutrients.filter(nutrient =>
      VITAMIN_NUTRIENTS.includes(nutrient.nutrient.name)
    );
  
    const otherNutrients = result.foodNutrients.filter(
      nutrient => !USDA_REQUIRED_NUTRIENTS.includes(nutrient.nutrient.name) && !VITAMIN_NUTRIENTS.includes(nutrient.nutrient.name)
    );
  
    const gaps = selectedDiet ? compareNutrientsToDiet(result.foodNutrients, selectedDiet) : [];
  
    return (
      <div className="nutrition-label">
        <h2>{result.description}</h2>
        <p>Brand: {result.brandName || 'N/A'}</p>
  
        <div className="serving">
          <span>Serving Size</span>
          <span>{servingSize ? `${servingSize} ${result.servingSizeUnit}` : 'N/A'}</span>
        </div>
  
        <div className="calories">
          <span>Calories</span>
          <span>{getNutrientValue(result, 'Energy')}</span>
        </div>
  
        <div className="nutrition-facts">
          <h3>Nutrition Facts</h3>
  
          {usdaNutrients.map((nutrient, index) => (
            <div key={index} className="nutrition-item">
              <span>{nutrient.nutrient.name}</span>
              <span>{getNutrientValue(result, nutrient.nutrient.name)}</span>
            </div>
          ))}
  
          <h4>Vitamins</h4>
          {vitaminNutrients.map((nutrient, index) => (
            <div key={index} className="nutrition-item">
              <span>{nutrient.nutrient.name}</span>
              <span>{getNutrientValue(result, nutrient.nutrient.name)}</span>
            </div>
          ))}
  
          {showAll &&
            otherNutrients.map((nutrient, index) => (
              <div key={index} className="nutrition-item">
                <span>{nutrient.nutrient.name}</span>
                <span>{getNutrientValue(result, nutrient.nutrient.name)}</span>
              </div>
            ))}
          <div className="nutrition-item">
            <button onClick={toggleShowAll}>{showAll ? 'Show Less' : '...More'}</button>
          </div>
        </div>
  
        {selectedDiet && (
          <div className="diet-gaps">
            <h4>{selectedDiet.charAt(0).toUpperCase() + selectedDiet.slice(1)} Diet Gaps</h4>
            {gaps.length > 0 ? (
              gaps.map((gap, index) => (
                <div key={index} className="gap-item">
                  <span>{gap.nutrient}</span>
                  <span>{`Current: ${gap.amount}, Required: ${gap.required}`}</span>
                </div>
              ))
            ) : (
              <p>No gaps found.</p>
            )}
          </div>
        )}
  
        <p className="date">Publication Date: {result.publicationDate || 'N/A'}</p>
      </div>
    );
  };
  
export default NutritionLabel;