const fs = require('fs');

const writeFileCustum = function(filePath, writeData) {
    fs.writeFile(filePath, JSON.stringify(writeData), function(err) {
        if(err) console.log(err)
        else console.log("ghi file thanh cong");
    });
}

console.log("bat dau ghi file.")
fs.writeFile("test.txt", jsonData , function(err) {
    if(err) console.log(err)
    else console.log("thanh cong");
});
console.log("ket thuc ghi");

module.exports = {
    readFileCustom,
    writeFileCustum
}