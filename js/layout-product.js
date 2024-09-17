// Product Profile
function createProfileObject(sourceData) {
    return {
    "itemName": sourceData.itemName,
    "sections": [
        { "name": "Global Warming Potential", "value": sourceData.valueGlobalWarmingPotential },
        { "name": "ghgunits", "value": sourceData.ghgunits },
        {
            "name": "Total Something",
            "value": sourceData.valueTotalFat,
            "dailyValue": calculateDailyValue(sourceData.valueTotalFat, 'fat'),
            "subsections": [
                { "name": "Saturated Fat", "value": sourceData.valueSatFat, "dailyValue": calculateDailyValue(sourceData.valueSatFat, 'satFat') },
                { "name": "Trans Fat", "value": sourceData.valueTransFat }
            ]
        },
    ]
    }
}