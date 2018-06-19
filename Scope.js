// a = 6

// function showB() {
//     b = 10;

//     console.log(a);
//     console.log(b);
// }

// showB();

// console.log(a);
// console.log(global.b);

// abc();

// function abc() {console.log("hello")}

// function abc() {}
// const abc = function() {}
// const abc = () => {}

// setTimeout(function() {
//     console.log("5s")
// }, 5000) //5000ms


// const countDown = function(count) {
//     for(let i = count; i >= 0; i--) {
//         setTimeout(function() {
//             console.log(i);
//         }, 1000*(count - i));
//     }
// }

// countDown(5);

//Funtion Scope
    //var ton tai trong funtion ()

//Block Scope
    //let ton tai trong block {}

var data = null;
const print = function(i) {
    console.log(i);
}

const otherFuntion = function(funtionAsObject) {
    setTimeout(function(){
        data = 15;
        onGetData(data);
    }, 1000);
    console.log(data + 5);
}

otherFuntion(print);