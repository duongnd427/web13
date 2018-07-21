// const fs = require("fs");

const fileModule = require("./fileModule");
fileModule("testModule.json", "abcxyz");

//bất đồng bộ: sẽ chạy dòng lệnh tiếp theo

// let writeData = {
//     a: 5,
//     b: 6
// }

// let  jsonData = JSON.stringify(writeData);

// console.log("bat dau ghi file.")
// fs.writeFile("test.txt", jsonData , function(err) {
//     if(err) console.log(err)
//     else console.log("thanh cong");
// });
// console.log("ket thuc ghi");

//đồng bộ: chờ writeFileSync chạy xong mới chạy lệnh tiếp
//fs.writeFileSync

// console.log("bat dau ghi file.")
// fs.writeFileSync("test.txt", "Hello");
    // console.log("thanh cong");
// console.log("ket thuc ghi");

// console.log("bat dau doc file");
// fs.readFileSync("test.txt", function(err, data) {
//     if(err) console.log(err)
//     else console.log("doc file thanh cong" + JSON.parse(data));
// });
// console.log("ket thuc doc file");



// console.log("bat dau doc file");
// let fileData = fs.readFileSync("test.txt");
// console.log("doc file thanh cong: " + fileData);
// console.log("ket thuc doc file");
