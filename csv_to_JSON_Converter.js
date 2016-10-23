var fs = require('fs');
var rl = require('readline');
var header;
var head = true;
var headRequired =[];
arr = [[],[],[]];
var rlemitter = rl.createInterface({
    input:fs.createReadStream("input/G20.csv"),
    output: fs.createWriteStream("output/Package.json")
  });

  rlemitter.on('line',function(line) {

    //on reading file line by line
    if(head){
      header = line.split(",");
      for(var i=0;i<header.length;i++){
        if(header[i]=='"Country Name"'){
          headRequired.push(i);
          header[i]= removeQuotation(header[i]);
        }
        if(header[i]=='"Population (Millions) 2013"'){
          headRequired.push(i);
          header[i]=removeQuotation(header[i]);
        }
        if(header[i]=='"GDP Billions (USD) 2013"'){
          headRequired.push(i);
          header[i]=removeQuotation(header[i]);
        }
        if(header[i]=='"Gross domestic product based on Purchasing-Power-Parity (PPP) valuation of Country GDP in Billions (Current International Dollar) 2013"'){
          headRequired.push(i);
          header[i]=removeQuotation(header[i]);
        }
      }
      head = false;
    }
    else {
      var data = line.split(",");
      var obj = [{},{},{}];
      obj[0]["Country"]=removeQuotation(data[headRequired[0]]);
      obj[1]["Country"]=removeQuotation(data[headRequired[0]]);
      obj[2]["Country"]=removeQuotation(data[headRequired[0]]);
      obj[0]["Population2013"]= Number(removeQuotation(data[headRequired[1]]));
      obj[1]["GDP2013"]= Number(removeQuotation(data[headRequired[2]]));
      obj[2]["PurchasingPower2013"]= Number(removeQuotation(data[headRequired[3]]));
      arr[0].push(obj[0]);
      arr[1].push(obj[1]);
      arr[2].push(obj[2]);
    }
  });
  rlemitter.on('close',function(){
    Sorted();
    fs.appendFile("output/Package_Population.json",JSON.stringify(arr[0]),function(err){
      if(err) throw err;
      console.log("File1 Written Successfully");
    })
    fs.appendFile("output/Package_GDP.json",JSON.stringify(arr[1]),function(err){
      if(err) throw err;
      console.log("File2 Written Successfully");
    })
    fs.appendFile("output/Package_PP.json",JSON.stringify(arr[2]),function(err){
      if(err) throw err;
      console.log("File3 Written Successfully");
    })

  });

  function removeQuotation(str){
    str = str.split("");
    str.pop();
    str.shift();
    return str.join("");
  }
  function Sorted() {
    for(var i=0;i<arr.length;i++){
      var k = Object.keys(arr[i][0]);
      arr[i].sort(function(a,b){
        return b[k[1]]-a[k[1]];
      });
    }
  }
  fs.writeFile('output/Package_Population.json',"", (err) => {
    if (err) throw err;
  });

  fs.writeFile('output/Package_GDP.json',"", (err) => {
    if (err) throw err;
  });

  fs.writeFile('output/Package_PP.json',"", (err) => {
    if (err) throw err;
  });
