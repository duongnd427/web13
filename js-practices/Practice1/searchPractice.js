'use strict'

function search(input, target) {
  for(let temp = 0; temp <= input.length; temp++) {
    if (input[temp] == target) {
      return 1;
      break;
    } else return -1;
  }
}

module.exports = search
