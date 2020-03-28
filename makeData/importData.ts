import { country, Countries } from "./countryList";
import { parse, Parser } from "papaparse";
import { JH } from "./jh";
import { parentPort } from "worker_threads";
import { close } from "fs";
import { addListener } from "cluster";
var fs = require("fs");

let definitionCountries = Countries;
(async () => {
  try {
    await main();
    console.log("done");
  } catch (e) {
    console.log(e);
    console.log("Error" + JSON.stringify(e));
  }
})();
async function main() {
  var dt = new Date(2020, 0, 22);
  console.log(dt);
  var now = new Date();
  while (dt < now) {
    console.log(dt);
    await load(dt);
    dt.setDate(dt.getDate() + 1);
    // return;
  }
}
function onlyUnique(value, index, self): boolean {
  return self.indexOf(value) === index;
}
async function getData(url: string) {
  try {
    const fetch = require("node-fetch");
    const response = await fetch(url);
    const json = await response.text();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function load(dt: Date) {
  console.log("start");
  var moment = require("moment");
  var dtRequired = moment(dt);
  var nameFile = `${dtRequired.format("YYYYMMDD")}JH.txt`;
  var dtFormat = dtRequired.format("MM-DD-YYYY");
  const path = require("path");
  const fs = require("fs");
  let directoryJS = path.join(__dirname + "/..", "obj", nameFile);
  // directoryJS = path.join(__dirname, nameFile);
  if (fs.existsSync(directoryJS)) {
    console.log(`${directoryJS} exists`);
    return; 
  }

  console.log(dtFormat);

  //const file:string="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-26-2020.csv"//
  const fileName = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${dtFormat}.csv`;
  console.log(fileName);

  const file = await getData(fileName);
  //const file = fs.createReadStream(__dirname +'\\test.csv');
  //console.log(file);
  const namesArr = definitionCountries.map(it => it.alternateNames);
  const alternates = ([] as string[]).concat(...namesArr);
  let i: number = 0;
  var p = parse(file, {
    header: true,
    transformHeader: h => {
      switch (h.trim().toLowerCase()) {
        case "province/state":
          return "Province_State";
        case "country/region":
          return "Country_Region";
        case "last update":
          return "Last_Update";
      }

      return h;
    },
    delimiter: ",",
    skipEmptyLines: true,
    //preview: 3000,
    error: (error, file) => {
      console.log("!!!error for file " + file);
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
      if (result.errors.length > 0) {
        console.log("errors");
        console.log(result.errors);
        throw "error parse";
      }
      let parseArr: JH[] = result.data;
      const NotCountry : string[]= [
        "Congo (Kinshasa)",
        "Taiwan*",
        "Hong Kong",
        "Macau",
        "Taiwan",
        "Cruise Ship",
        "French Guiana",
        "Martinique",
        "Reunion",
        "Others",
        "Saint Barthelemy",
        "occupied Palestinian territory",
        "Diamond Princess",
        "North Ireland",
        "Faroe Islands",
        "Gibraltar",
        "Hong Kong SAR",
        "Taipei and environs"
      ]
      parseArr = parseArr.filter(it=>!NotCountry.includes(it.Country_Region) );
      console.log("loaded " + parseArr.length);
      parseArr.forEach(it => it.Country_Region=it.Country_Region.trim());
      parseArr.forEach(it => {
        if (
          alternates.filter(name => {
            return name == it.Country_Region;
          }).length == 0
        ) {
          console.log(
            `not found country ${it.Country_Region} ${JSON.stringify(it)}`
          );
          throw `not found country ${JSON.stringify(it)}`;
        }
      });
      parseArr = parseArr.map(it => new JH(it));
      //console.log(parseArr);
      let data = parseArr.filter(
        it =>
          it.Country_Region.length > 0 &&
          (it.Province_State == "" || it.Country_Region == it.Province_State)
      );
      console.log("to write : " + data.length);

      //find all that have not have been reported globally
      const arrCountries = data.map(it => it.Country_Region).filter(onlyUnique);
      const allCountries = parseArr
        .map(it => it.Country_Region)
        .filter(onlyUnique);
      const difference = allCountries.filter(x => !arrCountries.includes(x));
      if (difference.length > 0) {
        difference.map(countryNotFound => {
          let jh = new JH();
          jh.Province_State = "";
          jh.Country_Region = countryNotFound;
          jh.initialize();
          parseArr.forEach(it => {
            if (it.Country_Region === countryNotFound ) {
              jh.Confirmed = jh.Confirmed + +it.Confirmed;
              jh.Deaths += +it.Deaths;
              jh.Active += +it.Active;
              jh.Recovered += +it.Recovered;
              jh.Last_Update = it.Last_Update;
            }
          });
          console.log("pushing");
          console.log(jh); 
          parseArr.push(jh);
        });
        data = parseArr.filter(
          it =>
            it.Country_Region.length > 0 &&
            (it.Province_State == "" || it.Country_Region == it.Province_State)
        );
        console.log("to write : " + data.length);
      }

      data.forEach(
        it =>
          (it.Country_Region = definitionCountries.filter(
            cnt =>
              cnt.alternateNames.filter(alt => alt === it.Country_Region)
                .length > 0
          )[0].name)
      );

      var js = JSON.stringify(data, null, "\t").replace(
        /\"([^(\")"]+)\":/g,
        "$1:"
      );
      
      js = `//${fileName} \r\n export const JH${dtRequired.format("YYYYMMDD")} : []=` + js;
      fs.writeFileSync(directoryJS, js);
      
    }
  });

  //console.log(p);
}
