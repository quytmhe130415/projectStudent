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
export default Student;