var fs = require('fs');
var rl = require('readline');
var key;
var head = true;
var key1 =[];
arr = [[],[],[]];
var rlemitter = rl.createInterface(
{
  input:fs.createReadStream("G20.csv"),
  output: fs.createWriteStream("Package.json")
});

rlemitter.on('line',function(line)
{
  //on reading file line by line
  if(head)
  {
    key = line.split(",");
    for(var i=0;i<key.length;i++)
    {
      if(key[i]=='"Country Name"')
      {
        key1.push(i);
        key[i]= parsing(key[i]);
      }
      if(key[i]=='"Population (Millions) 2013"')
      {
        key1.push(i);
        key[i]=parsing(key[i]);
      }
      if(key[i]=='"GDP Billions (USD) 2013"')
      {
        key1.push(i);
        key[i]=parsing(key[i]);
      }
      if(key[i]=='"Gross domestic product based on Purchasing-Power-Parity (PPP) valuation of Country GDP in Billions (Current International Dollar) 2013"')
      {
        key1.push(i);
        key[i]=parsing(key[i]);
      }
    }
    head = false;
  }
  else {
      var data = line.split(",");
      var obj = [{},{},{}];
      obj[0]["Country"]=parsing(data[key1[0]]);
      obj[1]["Country"]=parsing(data[key1[0]]);
      obj[2]["Country"]=parsing(data[key1[0]]);
      obj[0]["Population2013"]= Number(parsing(data[key1[1]]));
      obj[1]["GDP2013"]= Number(parsing(data[key1[2]]));
      obj[2]["PurchasingPower2013"]= Number(parsing(data[key1[3]]));
      arr[0].push(obj[0]);
      arr[1].push(obj[1]);
      arr[2].push(obj[2]);
  }
});
rlemitter.on('close',function()
{
  Sorted();
  fs.appendFile("Package_Population.json",JSON.stringify(arr[0]),function(err){
    if(err) throw err;
    console.log("File1 Written Successfully");
})
  fs.appendFile("Package_GDP.json",JSON.stringify(arr[1]),function(err){
    if(err) throw err;
    console.log("File2 Written Successfully");
})
  fs.appendFile("Package_PP.json",JSON.stringify(arr[2]),function(err){
    if(err) throw err;
    console.log("File3 Written Successfully");
})

});

function parsing(str)
{
  str = str.split("");
  str.pop();
  str.shift();
  return str.join("");
}
function Sorted()
{
  for(var i=0;i<arr.length;i++)
  {
    var k = Object.keys(arr[i][0]);
    arr[i].sort(function(a,b){
    return b[k[1]]-a[k[1]];
    });
  }
}
fs.writeFile('Package_Population.json',"", (err) => {
if (err) throw err;
});

fs.writeFile('Package_GDP.json',"", (err) => {
if (err) throw err;
});

fs.writeFile('Package_PP.json',"", (err) => {
if (err) throw err;
});
