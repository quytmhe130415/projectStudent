//* validate
  const validateContent = inputField => {
    let check = RegExp('[\\d!@#$%^&*(),.?:{}|<>_+="]').test(inputField);
    if (inputField.trim().length === 0 || !inputField || check) {
      check = false;
    } else {
      check = true;
    }
    return check;
  };
  
  
  //*checkValidate Mark
  const validateMark = marks => {
    let check = true;
    marks.forEach(item => {
      if (item === "" || parseInt(item) < 0 || parseInt(item) > 10) {
        check = false;
      }
    });
    return check;
  };

module.exports = { validateContent, validateMark };
