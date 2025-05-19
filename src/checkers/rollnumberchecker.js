/**
 * Validates if the roll number is exactly of 12 digits
 * @param {string} rollNumber - The roll number to validate
 * @returns {boolean} - Returns true if roll number is valid, false otherwise
 */
const validateRollNumber = (rollNumber) => {
    // Check if rollNumber is a string and contains exactly 12 digits
    return typeof rollNumber === 'string' && /^\d{12}$/.test(rollNumber);
};

export default validateRollNumber;