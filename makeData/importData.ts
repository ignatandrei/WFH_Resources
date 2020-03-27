import {country,Countries} from './countryList';
import { parse, Parser } from 'papaparse';
import { JH } from './jh'
import { parentPort } from 'worker_threads';
var fs = require('fs');

let definitionCountries = Countries;
(async () => {
    try
     {
      await main();
      console.log("done");
    } 
    catch (e) 
    {
      console.log(e);
      console.log("Error" + JSON.stringify(e));
    }
  })();

async function main(){
    console.log('start');
    //const file:string="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-26-2020.csv"//
    const file = fs.createReadStream(__dirname +'\\test.csv');
    //console.log(file);
    const namesArr=definitionCountries.map(it=>it.alternateNames);
    const alternates= ([] as string[]).concat(...namesArr);
    let i:number=0;
    var p=parse(file, {
      
      header: true, 
      transformHeader:h => {
        switch(h){
          case 'Province/State':
            return 'Province_State';
          case 'Country/Region':
            return 'Country_Region';
          case 'Last Update':
            return 'Last_Update';
        }
        
        return h;
      },
      delimiter: ",", 
      skipEmptyLines:true,
      //preview: 3000,
      error:(error, file)=>{
        console.log('!!!error for file ' + file);
        console.log(error);
      },
      // step: function(results, parser) {
      //   i++;
      //   if(results.errors.length>0){
      //     console.log(i); 
      //     console.log("Row data:", results.data);
      //     console.log("Row errors:", results.errors);
      //     throw 'error parse';
      // }
      // },
      complete: (result, file) => {
       // console.log(result.meta);
          if(result.errors.length>0){
            console.log('errors');
            console.log(result.errors);
            throw 'error parse';  
          }
         let parseArr:JH[]=result.data;
         parseArr=parseArr
          .filter(it=>it.Country_Region != "Congo (Kinshasa)")
          .filter(it=>it.Country_Region != "Taiwan*")
          .filter(it=>it.Country_Region != "Cruise Ship")
          .filter(it=>it.Country_Region != "French Guiana")
          .filter(it=>it.Country_Region != "Martinique")
          .filter(it=>it.Country_Region != "Reunion")
          .filter(it=>it.Country_Region != "occupied Palestinian territory")
          .filter(it=>it.Country_Region != 'Diamond Princess');
         console.log('loaded ' + parseArr.length);
         parseArr.forEach(it=>{
          if(alternates.filter(name=>{
            return name == it.Country_Region;
          }).length == 0){
              
            console.log(`not found country ${it.Country_Region} ${JSON.stringify(it)}`);
            throw `not found country ${JSON.stringify(it)}`;
          }

         });
         parseArr=parseArr.map(it=>new JH(it));
         const data=parseArr.filter(it=>it.Country_Region.length>0 && ( it.Province_State =='' || it.Country_Region==it.Province_State));
         var js=JSON.stringify(data, null, '\t').replace(/\"([^(\")"]+)\":/g,"$1:");

         const path = require("path");
         const fs = require("fs");
         let directoryJS = path.join(__dirname + "/..", "obj","all.js");
         directoryJS = path.join(__dirname ,"all.txt");
   
         fs.writeFileSync(directoryJS,js);


         
    }
     }
    );  
    
    //console.log(p);  
    
    
}