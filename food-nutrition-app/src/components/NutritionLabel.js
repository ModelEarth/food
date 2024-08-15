import React from 'react';
import './NutritionLabel.css';

const NutritionLabel = ({ result, servingSize }) => {
    console.log(result)
  const getNutrientValue = (nutrientName) => {
    const nutrient = result.foodNutrients.find(n => n.nutrient.name === nutrientName);
    if (!nutrient) return '0';
    const originalServingSize = result.servingSize || 100;
    const adjustedAmount = (nutrient.amount * servingSize) / originalServingSize;
    return adjustedAmount.toFixed(1);
  };

  return (
    <div className="nutrition-label">
      <div className="header">
        <h2>Nutrition Facts</h2>
        <span>Name: {result.description}, {result.brandName}</span>
      </div>
      <div className="serving-info">
        <span>Serving Size {servingSize} {result.servingSizeUnit}</span>
      </div>
      <div className="line thick"></div>

      <div className="nutrition-item calories">
        <span>Calories</span>
        <span>{getNutrientValue('Energy')}</span>
      </div>
      <div className="line"></div>

      <div className="nutrition-item">
        <span>Total Fat</span>
        <span>{getNutrientValue('Total lipid (fat)')}g</span>
      </div>
      <div className="indent">
        <div className="nutrition-subitem">
          <span>Saturated Fat</span>
          <span>{getNutrientValue('Fatty acids, total saturated')}g</span>
        </div>
        <div className="nutrition-subitem">
          <span>Trans Fat</span>
          <span>{getNutrientValue('Fatty acids, total trans')}g</span>
        </div>
      </div>
      <div className="line"></div>

      <div className="nutrition-item">
        <span>Cholesterol</span>
        <span>{getNutrientValue('Cholesterol')}mg</span>
      </div>
      <div className="line"></div>

      <div className="nutrition-item">
        <span>Sodium</span>
        <span>{getNutrientValue('Sodium, Na')}mg</span>
      </div>
      <div className="line"></div>

      <div className="nutrition-item">
        <span>Total Carbohydrate</span>
        <span>{getNutrientValue('Carbohydrate, by difference')}g</span>
      </div>
      <div className="indent">
        <div className="nutrition-subitem">
          <span>Dietary Fiber</span>
          <span>{getNutrientValue('Fiber, total dietary')}g</span>
        </div>
        <div className="nutrition-subitem">
          <span>Total Sugars</span>
          <span>{getNutrientValue('Sugars, total')}g</span>
        </div>
      </div>
      <div className="line"></div>

      <div className="nutrition-item">
        <span>Protein</span>
        <span>{getNutrientValue('Protein')}g</span>
      </div>
      <div className="line thick"></div>

      <div className="footer">
        <p className="date">Publication Date: {result.publicationDate || 'N/A'}</p>
      </div>
    </div>
  );
};

export default NutritionLabel;



