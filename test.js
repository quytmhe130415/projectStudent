'use strict';
const fs = require('fs');
let lstStudent = [];
let readData = () => {
  fs.readFile('./dataStudent.txt','utf-8',(err,data) => {
    if(err){
        console.log('err: ' + err);
        return;
    }
    lstStudent =  lstStudent.push(data.split('\n'));
})};
//console.log(typeof lstStudent);
readData();
for(let i = 0 ; i < lstStudent.length; i++){
  console.log(lstStudent[i]);
}
