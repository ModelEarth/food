function parseNutritionData(sourceData) {
    const dailyValueCalculations = {
        fat: 65, // Total Fat
        satFat: 20, // Saturated Fat
        cholesterol: 300, // Cholesterol
        sodium: 2400, // Sodium
        carb: 300, // Total Carbohydrate
        fiber: 25, // Dietary Fiber
        addedSugars: 50, // Added Sugars
        vitaminD: 20, // Vitamin D (mcg)
        calcium: 1300, // Calcium (mg)
        iron: 18, // Iron (mg)
        potassium: 4700 // Potassium (mg)
    };
    $(document).ready(function () {
        $("#dailyDiv").text(JSON.stringify(dailyValueCalculations));
    });
    // Calculate daily values (assuming source data is for a typical 2,000-calorie diet)
    function calculateDailyValue(value, type) {
        const base = dailyValueCalculations[type];
        return base ? ((value / base) * 100).toFixed(0) : null;
    }

    const parsedData = {
        itemName: sourceData.itemName,
        sections: [
            { name: "Calories", value: sourceData.valueCalories },
            { name: "Calories from Fat", value: sourceData.valueFatCalories },
            {
                name: "Total Fat",
                value: sourceData.valueTotalFat,
                dailyValue: calculateDailyValue(sourceData.valueTotalFat, 'fat'),
                subsections: [
                    { name: "Saturated Fat", value: sourceData.valueSatFat, dailyValue: calculateDailyValue(sourceData.valueSatFat, 'satFat') },
                    { name: "Trans Fat", value: sourceData.valueTransFat }
                ]
            },
            { name: "Cholesterol", value: sourceData.valueCholesterol, dailyValue: calculateDailyValue(sourceData.valueCholesterol, 'cholesterol') },
            { name: "Sodium", value: sourceData.valueSodium, dailyValue: calculateDailyValue(sourceData.valueSodium, 'sodium') },
            {
                name: "Total Carbohydrate",
                value: sourceData.valueTotalCarb,
                dailyValue: calculateDailyValue(sourceData.valueTotalCarb, 'carb'),
                subsections: [
                    { name: "Dietary Fiber", value: sourceData.valueFibers, dailyValue: calculateDailyValue(sourceData.valueFibers, 'fiber') },
                    { name: "Sugars", value: sourceData.valueSugars }
                ]
            },
            { name: "Protein", value: sourceData.valueProteins },
            { name: "Vitamin D", value: sourceData.valueVitaminD, dailyValue: calculateDailyValue(sourceData.valueVitaminD, 'vitaminD') },
            { name: "Potassium", value: sourceData.valuePotassium_2018, dailyValue: calculateDailyValue(sourceData.valuePotassium_2018, 'potassium') },
            { name: "Calcium", value: sourceData.valueCalcium, dailyValue: calculateDailyValue(sourceData.valueCalcium, 'calcium') },
            { name: "Iron", value: sourceData.valueIron, dailyValue: calculateDailyValue(sourceData.valueIron, 'iron') },
            { name: "Added Sugars", value: sourceData.valueAddedSugars, dailyValue: calculateDailyValue(sourceData.valueAddedSugars, 'addedSugars') },
            { name: "Caffeine", value: sourceData.valueCaffeine }
        ]
    };

    return parsedData;
}

// Example source data from the provided object
const sourceData = {
    showServingUnitQuantity: false,
    itemName: 'Bleu Cheese Dressing',
    ingredientList: 'Bleu Cheese Dressing',
    decimalPlacesForQuantityTextbox: 2,
    valueServingUnitQuantity: 1,
    allowFDARounding: true,
    decimalPlacesForNutrition: 2,
    showPolyFat: false,
    showMonoFat: false,
    valueCalories: 450,
    valueFatCalories: 430,
    valueTotalFat: 48,
    valueSatFat: 6,
    valueTransFat: 0,
    valueCholesterol: 30,
    valueSodium: 780,
    valueTotalCarb: 3,
    valueFibers: 0,
    valueSugars: 3,
    valueProteins: 3,
    valueVitaminD: 12.22,
    valuePotassium_2018: 4.22,
    valueCalcium: 7.22,
    valueIron: 11.22,
    valueAddedSugars: 17,
    valueCaffeine: 15.63,
    showLegacyVersion: false
};



// Example parsedNutritionLabel object from the earlier steps
const parsedNutritionLabelXXX = {
    itemName: "Bleu Cheese Dressing",
    sections: [
        { name: "Calories", value: 450 },
        { name: "Calories from Fat", value: 430 },
        {
            name: "Total Fat",
            value: 48,
            dailyValue: 74,
            subsections: [
                { name: "Saturated Fat", value: 6, dailyValue: 30 },
                { name: "Trans Fat", value: 0 }
            ]
        },
        { name: "Cholesterol", value: 30, dailyValue: 10 },
        { name: "Sodium", value: 780, dailyValue: 32 },
        {
            name: "Total Carbohydrate",
            value: 3,
            dailyValue: 1,
            subsections: [
                { name: "Dietary Fiber", value: 0 },
                { name: "Sugars", value: 3, dailyValue: 0 },
                { name: "Includes 17g Added Sugars", value: 17, extraIndent: true }
            ]
        },
        { name: "Protein", value: 3 },
        { name: "Vitamin D", value: 12.22, dailyValue: 61 },
        { name: "Potassium", value: 4.22, dailyValue: 0.1 },
        { name: "Calcium", value: 7.22, dailyValue: 7.2 },
        { name: "Iron", value: 11.22, dailyValue: 62 },
        { name: "Caffeine", value: 15.63 }
    ]
};

function populateNutritionLabel(data) {
    document.getElementById("item-name").innerText = data.itemName;

    const sectionsContainer = document.getElementById("sections");
    sectionsContainer.innerHTML = ''; // Clear existing content

    data.sections.forEach(section => {
        const sectionDiv = document.createElement("div");
        sectionDiv.classList.add("nutrition-section");

        // Add section name and value
        sectionDiv.innerHTML = `
            <div class="section-title">
                <span><strong>${section.name}</strong> <span class="value">${section.value}${section.value ? 'g' : ''}</span></span>
                <span class="daily-value">${section.dailyValue ? section.dailyValue + '%' : ''}</span>
            </div>
        `;

        // Add subsections if they exist
        if (section.subsections) {
            section.subsections.forEach(subsection => {
                const subSectionDiv = document.createElement("div");
                subSectionDiv.classList.add("sub-section");
                if (subsection.extraIndent) subSectionDiv.classList.add("extra-indent");

                subSectionDiv.innerHTML = `
                    <span>${subsection.name}</span>
                    <span class="value">${subsection.value}${subsection.value ? 'g' : ''}</span>
                    <span class="daily-value">${subsection.dailyValue ? subsection.dailyValue + '%' : ''}</span>
                `;

                sectionDiv.appendChild(subSectionDiv);
            });
        }

        sectionsContainer.appendChild(sectionDiv);
        sectionsContainer.appendChild(document.createElement('hr')).classList.add('thin-line');
    });
}

// Function to update the nutrition label based on quantity
function updateNutritionLabel(quantity) {
    const updatedData = JSON.parse(JSON.stringify(parsedNutritionLabel));
    updatedData.sections.forEach(section => {
        if (section.value) section.value = (section.value * quantity).toFixed(2);
        if (section.dailyValue) section.dailyValue = (section.dailyValue * quantity).toFixed(0);
        if (section.subsections) {
            section.subsections.forEach(subsection => {
                if (subsection.value) subsection.value = (subsection.value * quantity).toFixed(2);
                if (subsection.dailyValue) subsection.dailyValue = (subsection.dailyValue * quantity).toFixed(0);
            });
        }
    });
    populateNutritionLabel(updatedData);
}

// Parse the source data into the desired structure
const parsedNutritionLabel = parseNutritionData(sourceData);
console.log("parsedNutritionLabel:")
console.log(parsedNutritionLabel);

$(document).ready(function () { // TO DO: Change to just wait for #item-name
    // Event listeners for quantity input
    document.getElementById('quantity-input').addEventListener('change', (e) => {
        const quantity = parseFloat(e.target.value) || 1;
        updateNutritionLabel(quantity);
    });

    document.getElementById('decrease-quantity').addEventListener('click', () => {
        const input = document.getElementById('quantity-input');
        let quantity = parseFloat(input.value) || 1;
        if (quantity > 1) {
            quantity--;
            input.value = quantity;
            updateNutritionLabel(quantity);
        }
    });

    document.getElementById('increase-quantity').addEventListener('click', () => {
        const input = document.getElementById('quantity-input');
        let quantity = parseFloat(input.value) || 1;
        quantity++;
        input.value = quantity;
        updateNutritionLabel(quantity);
    });

    // Initial population - HTML
    populateNutritionLabel(parsedNutritionLabel);
    
    $("#sourceDiv").text(JSON.stringify(sourceData));
    $("#jsonDiv").text(JSON.stringify(parsedNutritionLabel));
});