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
  var folders = ["FreeSoftware", "Country","Kids","Learn"];
  let iContent=1;
  let contentTable='<table id="tbData">';
  contentTable +=" <thead>";
  contentTable+= '<tr> <th>Nr</th> <th> Category  </th><th>Name</th> </tr>';
  contentTable +="/<thead>";
  contentTable +=" <tbody>";
  contentTable+= "\r\n";
  let content ='';
  //const declarations = fs.readFileSync(path.join(__dirname + "/..", "makeData","headerIncludes.md"), 'utf8');
  const declarations ='';
  const readMe = fs.readFileSync(path.join(__dirname + "/..", "README.md"), 'utf8');

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
          contentTable +=`<tr><td>${iContent++}</td><td> ${folder} &gt; ${f.name} </td><td> ${token.text}</td> </tr>`;
              
        }
        

        
    }
    // console.log(contentTable);
    
  }
  contentTable +="</tbody>";

  contentTable+='</table>';

  
   const directoryPathWrite = path.join(__dirname + "/..", "obj","all.md");
   content = declarations + "\r\n"+ readMe +"\r\n" + contentTable +"\r\n"+ content;

    var script=`<script>
    $(document).ready( function () {
      window.alert('tst');
      $('#tbData').DataTable(
        {
          paging: false
        }
      );
      } );</script>`;
   
   content+=script;
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
