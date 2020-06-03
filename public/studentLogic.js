let idStudent = 1;
class Student {
  constructor(name, math, physical, chemistry) {
    this.name = name;
    this.math = math;
    this.physical = physical;
    this.chemistry = chemistry;
    this.id = idStudent++;
  }
  avg() {
    let sum =
      parseInt(this.math) + parseInt(this.physical) + parseInt(this.chemistry);
    sum = sum / 3;
    sum = Math.round(sum * 100) / 100;
    return sum;
  }
}
// import Student from './student.js';
// const Student = require('./student.js')
// const a = new Student();
// console.log('day la ' + typeof a);


//*create list Student
let currentEditId;
let listStudent = [];
const newTable = document.querySelector("#myTable");
//Button submit infomation of student
document.querySelector("#submit").addEventListener("click", e => {
  e.preventDefault();
  //infor data
  let name = document.querySelector("#inputFiel").value;
  let math = document.querySelector("#math").value;
  let physical = document.querySelector("#physical").value;
  let chemistry = document.querySelector("#chemistry").value;
  const marks = [math, physical, chemistry];
  //check Name
  if (!validateContent(name)) {
    setColorErrName(0);
  } else {
    setColorErrName(1);
  }
  if (!validateMark(marks)) {
    setColorErrMark(0);
  } else {
    setColorErrMark(1);
  }
  if (validateContent(name) && validateMark(marks)) {
    //let listProperty = [name, math, physical, chemistry, "?"];
    let student = new Student(name, math, physical, chemistry);
    //add Student vao list
    listStudent.push(student);
    //add new row
    let newTr = document.createElement("tr");
    createTdOfTableStudent(newTr, student.name);
    createTdOfTableStudent(newTr, student.math);
    createTdOfTableStudent(newTr, student.physical);
    createTdOfTableStudent(newTr, student.chemistry);
    createTdOfTableStudent(newTr, "?");
    reset();
    let updateTd = document.createElement("td");
    let button = document.createElement("button");
    button.type = "button";
    button.innerText = "Edit";
    button.classList.add("myBtn");
    updateTd.appendChild(button);
    newTr.appendChild(updateTd);
    newTable.appendChild(newTr);
    const idBtn = ".myBtn";
    addEventButton(idBtn);
  }
});
//*show proStudent
document.querySelector("#good").addEventListener("click", e => {
  e.preventDefault();
  let table = document.querySelectorAll("#myTable tr");
  for (const tr of table) {
    const arrTd = tr.querySelectorAll("td");
    const AVGTd = arrTd[arrTd.length - 2];
    if (Number(AVGTd.innerText) >= 9) {
      tr.setAttribute("class", "pro");
    }
  }
});
//*show avgStudent!
document.querySelector("#avg").addEventListener("click", e => {
  e.preventDefault();
  let list_Tr = document.querySelectorAll("#myTable tr");
  listStudent.forEach((item, index) => {
    const list_Td = list_Tr[index + 1].querySelectorAll("td");
    list_Td[list_Td.length - 2].innerText = item.avg();
  });
});

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
//*reset input from keyboard after submit
const reset = () => {
  document.querySelector("#inputFiel").value = "";
  document.querySelector("#math").value = "";
  document.querySelector("#physical").value = "";
  document.querySelector("#chemistry").value = "";
};
//*disable btn false
const disableBtn = type => {
  //type = 0 => disable btn
  type = parseInt(type);
  if (type === 0) {
    document.querySelector("#submit").setAttribute("disabled", false);
    document.querySelector("#avg").setAttribute("disabled", false);
    document.querySelector("#good").setAttribute("disabled", false);
  } else {
    document.querySelector("#submit").removeAttribute("disabled");
    document.querySelector("#avg").removeAttribute("disabled");
    document.querySelector("#good").removeAttribute("disabled");
    //document.querySelector("#save").setAttribute("disabled", false);
  }
};
//event save
//*save Student
const listBtn = document.querySelectorAll(".myBtn");
const btnSave = document.querySelector("#save");
document.querySelector("#save").addEventListener("click", e => {
  e.preventDefault();
  disableBtn(1);
  const name = document.querySelector("#inputFiel").value;
  const math = document.querySelector("#math").value;
  const physical = document.querySelector("#physical").value;
  const chemistry = document.querySelector("#chemistry").value;
  const marks = [math, physical, chemistry];
  if (!validateContent(name)) {
    setColorErrName(0);
  } else {
    setColorErrName(1);
  }
  if (!validateMark(marks)) {
    setColorErrMark(0);
  } else {
    setColorErrMark(1);
  }
  if (validateContent(name) && validateMark(marks)) {
    const table = document.querySelector("#myTable");
    const rowIndex = btnSave.name;
    const tr = table.rows[rowIndex];
    let total = (parseInt(math) + parseInt(physical) + parseInt(chemistry)) / 3;
    total = Math.round(total * 100) / 100;
    tr.querySelector("td:nth-child(1)").innerText = name;
    tr.querySelector("td:nth-child(2)").innerText = math;
    tr.querySelector("td:nth-child(3)").innerText = physical;
    tr.querySelector("td:nth-child(4)").innerText = chemistry;
    tr.querySelector("td:nth-child(5)").innerText = total;
    setColorErrName(1);
    setColorErrMark(1);
    reset();
    for (let student of listStudent) {
      if (student.id === currentEditId) {
        student.name = name;
        student.math = math;
        student.physical = physical;
        student.chemistry = chemistry;
      }
    }
  }
});
//*get Student by id
const getStudentById = (listStudent, idStudent) => {
  for (const student of listStudent) {
    if (student.id === idStudent) {
      return student;
    }
  }
};
//*set Color error Name
const setColorErrName = type => {
  type = parseInt(type);
  if (type === 0) {
    let nameInput = document.querySelector("#inputFiel");
    nameInput.classList.add("myStyle");
    document.querySelector("#errorName").textContent =
      "Your Name Invalid, Enter again!!!";
  } else {
    let nameInput = document.querySelector("#inputFiel");
    nameInput.classList.remove("myStyle");
    document.querySelector("#errorName").textContent = "";
  }
};
//*set Color error Mark
const setColorErrMark = type => {
  if (type === 0) {
    let math = document.querySelector("#math");
    let physical = document.querySelector("#physical");
    let chemistry = document.querySelector("#chemistry");
    math.classList.add("myStyle");
    physical.classList.add("myStyle");
    chemistry.classList.add("myStyle");
    document.querySelector("#errorMark").textContent =
      "Input Mark Invalid, Enter mark again [0 -> 10]!!!";
  } else {
    let math = document.querySelector("#math");
    let physical = document.querySelector("#physical");
    let chemistry = document.querySelector("#chemistry");
    math.classList.remove("myStyle");
    physical.classList.remove("myStyle");
    chemistry.classList.remove("myStyle");
    document.querySelector("#errorMark").textContent = "";
  }
};
//*create td table
const createTdOfTableStudent = (tr, text) => {
  const td = document.createElement("td");
  const txt = document.createTextNode(text);
  td.appendChild(txt);
  tr.appendChild(td);
};

//*add eventButton
const addEventButton = idButton => {
  const listBtn = document.querySelectorAll(idButton);
  let valueBtn = 1;
  listBtn.forEach(item => {
    item.setAttribute("value", valueBtn);
    console.log("value: " + item.value);
    valueBtn = ++valueBtn;
    item.addEventListener("click", e => {
      e.preventDefault();
      disableBtn(0);
      const tr = e.target.parentNode.parentNode;
      btnSave.name = tr.rowIndex;
      document.querySelector("#save").removeAttribute("disabled");
      let idStudent = parseInt(item.value);
      let student = getStudentById(listStudent, idStudent);
      console.log(student);
      currentEditId = student.id;
      if (student != null) {
        document.querySelector("#inputFiel").value = student.name;
        document.querySelector("#math").value = student.math;
        document.querySelector("#physical").value = student.physical;
        document.querySelector("#chemistry").value = student.chemistry;
      }
    });
  });
};
