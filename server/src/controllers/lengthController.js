const convertLength = (value, fromUnit, toUnit) => {
    const units = {
        'mm': 0.001,
        'cm': 0.01,
        'm': 1,
        'km': 1000,
        'in': 0.0254,
        'ft': 0.3048,
        'yd': 0.9144,
        'mi': 1609.344
    };

    const meters = value * units[fromUnit];
    return meters / units[toUnit];
};

const convert = (req, res) => {
    try {
        const { value, fromUnit, toUnit } = req.body;
        const result = convertLength(value, fromUnit, toUnit);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    convert
};