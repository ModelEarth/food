import React from 'react';
import { Bar } from 'react-chartjs-2';
// import './DietBarChart.css';

const DietBarChart = ({ totalNutrients, selectedDiet }) => {
  const dietStandards = {
    keto: { carbs: 50, protein: 75, fat: 150 }, // need to update with diets standard
    lowSugar: { sugar: 25, protein: 75, fat: 70 },
    
  };

  const chartData = {
    labels: ['Carbs', 'Protein', 'Fat', 'Sugar'], 
    datasets: [
      {
        label: 'Your Intake',
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.8)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [
          totalNutrients['Carbohydrate, by difference'] || 0,
          totalNutrients['Protein'] || 0,
          totalNutrients['Total lipid (fat)'] || 0,
          totalNutrients['Sugars, total'] || 0,
        ],
      },
      {
        label: `${selectedDiet.charAt(0).toUpperCase() + selectedDiet.slice(1)} Standard`,
        backgroundColor: 'rgba(153,102,255,0.6)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(153,102,255,0.8)',
        hoverBorderColor: 'rgba(153,102,255,1)',
        data: [
          dietStandards[selectedDiet]?.carbs || 0,
          dietStandards[selectedDiet]?.protein || 0,
          dietStandards[selectedDiet]?.fat || 0,
          dietStandards[selectedDiet]?.sugar || 0,
        ],
      }
    ]
  };

  return (
    <div className="diet-bar-chart">
      <h3>{selectedDiet.charAt(0).toUpperCase() + selectedDiet.slice(1)} Diet Comparison</h3>
      <Bar
        data={chartData}
        options={{
          scales: {
            x: { stacked: true },
            y: { beginAtZero: true }
          }
        }}
      />
    </div>
  );
};

export default DietBarChart;
