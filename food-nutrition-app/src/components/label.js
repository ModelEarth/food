
// share / download/ copy of menus 
// keto sets diet 

import React from 'react';
import './Label.css';
import Total from './Total';
import NutritionLabel from './NutritionLabel.js'
import { USDA_REQUIRED_NUTRIENTS, VITAMIN_NUTRIENTS, compareNutrientsToDiet } from './Diets.js';

const Label = ({ searchResults, servingSizes, selectedDiet }) => {

  const getTotalNutrients = () => {
    const totalNutrients = {};
    searchResults.forEach((result, index) => {
      result.foodNutrients.forEach(nutrient => {
        if (!totalNutrients[nutrient.nutrient.name]) {
          totalNutrients[nutrient.nutrient.name] = 0;
        }
        const originalServingSize = result.servingSize || 100;
        const adjustedAmount = (nutrient.amount * servingSizes[index]) / originalServingSize;
        totalNutrients[nutrient.nutrient.name] += adjustedAmount;
      });
    });
    return totalNutrients;
  };

  const totalNutrients = getTotalNutrients();

  const usdaNutrients = USDA_REQUIRED_NUTRIENTS.map(nutrient => ({
    name: nutrient,
    amount: totalNutrients[nutrient] || 0,
  }));

  const vitaminNutrients = VITAMIN_NUTRIENTS.map(nutrient => ({
    name: nutrient,
    amount: totalNutrients[nutrient] || 0,
  }));

  const otherNutrients = Object.keys(totalNutrients)
    .filter(nutrient => !USDA_REQUIRED_NUTRIENTS.includes(nutrient) && !VITAMIN_NUTRIENTS.includes(nutrient))
    .map(nutrient => ({
      name: nutrient,
      amount: totalNutrients[nutrient],
    }));

  return (
    <div className="label-container">
      <Total
        usdaNutrients={usdaNutrients}
        vitaminNutrients={vitaminNutrients}
        otherNutrients={otherNutrients}
      />
      {searchResults.map((result, index) => (
        <NutritionLabel
          key={index}
          result={result}
          servingSize={servingSizes[index]}
          selectedDiet={selectedDiet}
        />
      ))}
    </div>
  );
};

export default Label;

