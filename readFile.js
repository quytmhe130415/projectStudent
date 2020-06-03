const fs = require('fs');
const readline = require('readline');
const replace = require('replace-in-file');



//* read file to take data of student
const readFile = async (file, onLine) => {
  const fileStream = fs.createReadStream(file);
  const rl = readline.createInterface({
    input: fileStream
  });
  const students = []
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if(onLine(line)){
      try {
        students.push(JSON.parse(line))
      } catch (error) {
        console.log(error)
        continue
      }
    }
  }
  return students
}
//* save student
const appendFile = (nameFile, data) => {
  fs.appendFile(nameFile, data, err => {
    if(err){
      console.log('Err process file: ' + err);
      return;
    }
    console.log('Saved!');
  })
}

//* modifile
const modifyFile = async (file, newLine, onLine) => {
  const fileStream = fs.createReadStream(file);
  const rl = readline.createInterface({
    input: fileStream
  });
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if(onLine(line)){
      replace({
        files: file,
        from: line,
        to: newLine
      })
      return
    }
  }
}

module.exports = {readFile, appendFile, modifyFile};


















