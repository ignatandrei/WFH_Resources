import {country,Countries} from './countryList';
import { parse } from 'papaparse';

var fs = require('fs');

let heroes = Countries;
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
    
    var p=parse(file, {
      
      header: true,
      delimiter: ",",
     preview: 10,
      error:(error, file)=>{
        console.log('!!!error for file ' + file);
      },
      complete: (result, file) => {
       // console.log(result.meta);
         if(result.errors.length>0){
           throw result.errors;
         }
         console.log(result.data);
    }
     }
    );  
    await p;
    //console.log(p);  
    
    
}