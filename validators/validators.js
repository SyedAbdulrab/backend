
const validateAndReturnNumber = (value) => {
    const parsedValue = parseInt(value, 10);
    return !isNaN(parsedValue) ? parsedValue : 0;
  };
  
  const validateAndReturnString = (value) => {
    return typeof value === 'string' ? value.trim() : '';
  };

  const validateAndReturnEmail = (value) => {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Check if the value matches the email pattern
    const isValidEmail = emailRegex.test(value);
  
    // If valid, return the trimmed email; otherwise, return an empty string
    return isValidEmail ? value.trim() : '';
  };

  const validateAndStructureStudentData = (studentData) => {
    return {
      cms: validateAndReturnNumber(studentData.cms),
      name: validateAndReturnString(studentData.name),
      mealsnottaken: validateAndReturnNumber(studentData.mealsnottaken),
      imageUrl: validateAndReturnString(studentData.imageUrl),
      hostel: validateAndReturnString(studentData.hostel),
      email:validateAndReturnEmail(studentData.email),
      room:validateAndReturnString(studentData.room),
      batch:validateAndReturnString(studentData.batch),
      phone: validateAndReturnString(studentData.phone),
      username: validateAndReturnString(studentData.username),
      password: validateAndReturnString(studentData.password),
    };
  };
  
  module.exports = { validateAndReturnNumber, validateAndReturnString , validateAndStructureStudentData };