const convertTemperature = (value, fromUnit, toUnit) => {
    if (fromUnit === toUnit) return value;

    // Convert to Celsius first
    let celsius;
    if (fromUnit === 'C') celsius = value;
    else if (fromUnit === 'F') celsius = (value - 32) * 5/9;
    else if (fromUnit === 'K') celsius = value - 273.15;

    // Convert from Celsius to target unit
    if (toUnit === 'C') return celsius;
    else if (toUnit === 'F') return (celsius * 9/5) + 32;
    else if (toUnit === 'K') return celsius + 273.15;
};

const convert = (req, res) => {
    try {
        const { value, fromUnit, toUnit } = req.body;
        const result = convertTemperature(value, fromUnit, toUnit);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    convert
};