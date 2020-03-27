export class FullCovid {
    constructor(c: CovidData= null) {
      if (c == null) {
        return;
      }
      // tslint:disable-next-line: forin
      for (const k in c) { this[k] = c[k]; }
    }
    Country: string;
    Province: string;
    Cases: number;
    Status: string;
  
    RealDate: Date;
  
  }
  