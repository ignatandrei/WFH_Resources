"use strict";
console.log(`start print`);

//var markdownpdf = require("markdown-pdf")
(async () => {
  try {
    await main();
    console.log("done");
  } catch (e) {
    console.log("Error" + JSON.stringify(e));
  }
})();

async function main() {
  const path = require("path");
  const fs = require("fs");
  const { promisify } = require("util");
  const rra = require("recursive-readdir-async");
  var folders = ["FreeSoftware", "Country"];
  let content ='';
  for (let folder of folders) {
    const directoryPath = path.join(__dirname + "/..", folder);
    const list = await rra.list(directoryPath);
    content +="\r\n";
    content += `# ${folder}`;
    for(let f of list){
        content +="\r\n";
        content += fs.readFileSync(f.fullname, 'utf8');
    }
    
    
  }
   const directoryPathWrite = path.join(__dirname + "/..", "obj","all.md");
   fs.writeFileSync(directoryPathWrite,content);
}
//   var folders = ["FreeSoftware", "Country"];
//   for(let folder in folders) {
//     console.log(`processing ${folder}`);
//     const directoryPath = path.join(__dirname + "/..", folder);
//     const list = await rra.list(directoryPath);
//     console.log(list);
// fs.readdir(directoryPath, function(err, files) {
//   //handling error
//   if (err) {
//     return console.log("Unable to scan directory: " + err);
//   }
//   //listing all files using forEach
//   files.forEach(function(file) {
//     // Do whatever you want to do with the file
//     console.log(folder + file);
//   });
// });
//   });
// }
