const fs = require("fs");
const express = require("express");
const PORT = 8080;
const server = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const {readFile, appendFile, modifyFile} = require('./readfile');


server.use(cors());
server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("./public"));

//* show app
server.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./student.html"));
});



console.log(__dirname);
//* show list Student



server.get('/student', async (req,res) => {
    try {
      const lstStudent = await readFile('dataStudent.txt', () => true);
      res.send(lstStudent);
    } catch (error) {
      console.error(error);
    }
});



//* get Student by id
server.get('/student/:id', async (req, res) => {
  try {
    // console.log('body  key  la: ' + Object.keys(req.body) +" values: " + Object.values(req.body));
    // console.log(typeof req.body);
    console.log(req.params.id)
    const student = await readFile('dataStudent.txt', (line) => Number(req.params.id) === JSON.parse(line).id)
    console.log("student",student)
    res.json(...student);
  } catch (error) {
    res.status(404).end();
  }
})



//* add new student
server.post('/student', (req, res) => {
    const student = {
      'id': req.body.id,
      'name': req.body.name,
      'math': req.body.math,
      'physical': req.body.physical,
      'chemistry': req.body.chemistry,
    }
    try {
      appendFile('dataStudent.txt',`\n${JSON.stringify(student)}`);
    } catch (error) {
      res.json(error);
    }
})



//* update student
server.put('/:_id', (req,res) => {
    try {
      const student = {
        'id': req.body.id,
        'name': req.body.name,
        'math': req.body.math,
        'physical': req.body.physical,
        'chemistry': req.body.chemistry,
      }
      modifyFile('dataStudent.txt', JSON.stringify(student), (line) => {
        Number(req.params._id) === JSON.parse(line).id;
      })
      console.log();
    } catch (error) {
      res.json(error);
    }
})


//* delete Student
server.delete('/:_id', (req,res) => {
  try {
    modifyFile('dataStudent.txt', JSON.stringify({id: null}), (line) => Number(req.params._id) === JSON.parse(line).id)
  } catch (error) {
    res.json(error);
  }
})


server.listen(PORT, () => {
  console.info(`Server started at http://localhost:${PORT}`);
});
