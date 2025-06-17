const convertWeight = (value, fromUnit, toUnit) => {
    const units = {
        'mg': 0.000001,
        'g': 0.001,
        'kg': 1,
        't': 1000,
        'oz': 0.0283495,
        'lb': 0.453592,
        'st': 6.35029
    };

    const kg = value * units[fromUnit];
    return kg / units[toUnit];
};

const convert = (req, res) => {
    try {
        const { value, fromUnit, toUnit } = req.body;
        const result = convertWeight(value, fromUnit, toUnit);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    convert
};