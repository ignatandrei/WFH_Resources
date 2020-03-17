"use strict";
console.log(`start print`);

//var markdownpdf = require("markdown-pdf")
(async () => {
  try
   {
    await main();
    console.log("done");
  } 
  catch (e) 
  {
    console.log("Error" + JSON.stringify(e));
  }
})();

async function main() {
  const marked = require('marked');
  const path = require("path");
  const fs = require("fs");
  const { promisify } = require("util");
  const rra = require("recursive-readdir-async");
  var folders = ["FreeSoftware", "Country"];
  let iContent=1;
  let contentTable= '| Nr | Category | Name |';
  contentTable += '| ------------- |:-------------:| :-----:|';
  let content ='';
  for (let folder of folders) {
    const directoryPath = path.join(__dirname + "/..", folder);
    const list = await rra.list(directoryPath);
    content +="\r\n";
    content += `# ${folder}`;
    for(let f of list){
        content +="\r\n";
        //console.log(f);
        var fileContents= fs.readFileSync(f.fullname, 'utf8');
        content+=fileContents;

        const tokens = marked.lexer(fileContents);
        for(let token of tokens){
          if(token.type != 'heading')
            continue;
          if(token.depth !=2)
            continue;
          
          contentTable +="\r\n";
          contentTable +=`${iContent++}|${folder} &gt; ${f.name}|${token.text}|`;
              
        }
        

        
    }
    console.log(contentTable);
    
  }
   const directoryPathWrite = path.join(__dirname + "/..", "obj","all.md");
   content =contentTable +"\r\n"+ content;
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
