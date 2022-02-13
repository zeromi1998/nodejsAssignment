const fs = require('fs');
const readline = require('readline');

async function getPatternString() {
  const fileStream = fs.createReadStream('./sample.txt');

  const rl = readline.createInterface({
    input: fileStream,
    
  });

  var arr = []
  
  for await(const line of rl) {
    var filter = line.split(" ")
    filter = filter.slice(1,filter.length)
    arr.push("* " +filter.toString().replace(','," "))

   


  }
  var unique = [...new Set(arr)]

  for (var i =0 ;i<unique.length;i++){
      console.log(unique[i])
  }
  
}

getPatternString();






