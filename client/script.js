const unitOptions = {
    length: [
        { value: 'mm', label: 'Millimeter (mm)' },
        { value: 'cm', label: 'Centimeter (cm)' },
        { value: 'm', label: 'Meter (m)' },
        { value: 'km', label: 'Kilometer (km)' },
        { value: 'in', label: 'Inch (in)' },
        { value: 'ft', label: 'Foot (ft)' },
        { value: 'yd', label: 'Yard (yd)' },
        { value: 'mi', label: 'Mile (mi)' }
    ],
    weight: [
        { value: 'mg', label: 'Milligram (mg)' },
        { value: 'g', label: 'Gram (g)' },
        { value: 'kg', label: 'Kilogram (kg)' },
        { value: 't', label: 'Metric ton (t)' },
        { value: 'oz', label: 'Ounce (oz)' },
        { value: 'lb', label: 'Pound (lb)' },
        { value: 'st', label: 'Stone (st)' }
    ],
    temperature: [
        { value: 'C', label: 'Celsius (°C)' },
        { value: 'F', label: 'Fahrenheit (°F)' },
        { value: 'K', label: 'Kelvin (K)' }
    ]
};

let currentType = 'length';

function selectType(type) {
    currentType = type;
    // Tab highlight
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById('tab-' + type).classList.add('active');
    document.getElementById('tab-' + type + '-result').classList.add('active');
    // Label
    const label = document.getElementById('input-label');
    if (type === 'length') label.textContent = 'Enter the length to convert';
    else if (type === 'weight') label.textContent = 'Enter the weight to convert';
    else label.textContent = 'Enter the temperature to convert';
    // Update datalist
    updateUnitDatalist();
    // Reset form
    resetForm();
}

function updateUnitDatalist() {
    const fromList = document.getElementById('fromUnitList');
    const toList = document.getElementById('toUnitList');
    fromList.innerHTML = '';
    toList.innerHTML = '';
    unitOptions[currentType].forEach(opt => {
        const o1 = document.createElement('option');
        o1.value = opt.value;
        o1.label = opt.label;
        fromList.appendChild(o1);
        const o2 = document.createElement('option');
        o2.value = opt.value;
        o2.label = opt.label;
        toList.appendChild(o2);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateUnitDatalist();
    document.getElementById('tab-length').classList.add('active');
    document.getElementById('tab-length-result').classList.add('active');
});

function handleConvert(e) {
    e.preventDefault();
    const value = document.getElementById('value').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    if (!value || !fromUnit || !toUnit) {
        alert('Please fill all fields');
        return;
    }
    let apiUrl = '';
    if (currentType === 'length') apiUrl = '/api/length/convert';
    else if (currentType === 'weight') apiUrl = '/api/weight/convert';
    else apiUrl = '/api/temperature/convert';
    fetch('http://localhost:3000' + apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            value: parseFloat(value),
            fromUnit,
            toUnit
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.result !== undefined) {
            showResult(`${value} ${fromUnit} = ${data.result}${toUnit}`);
        } else {
            showResult('Error: ' + (data.error || 'Conversion failed'));
        }
    })
    .catch(() => showResult('Error: Cannot connect to server'));
}

function showResult(text) {
    document.getElementById('form-panel').style.display = 'none';
    document.getElementById('result-panel').style.display = 'flex';
    document.getElementById('result-value').textContent = text;
}

function resetForm() {
    document.getElementById('convert-form').reset();
    document.getElementById('form-panel').style.display = 'flex';
    document.getElementById('result-panel').style.display = 'none';
} 