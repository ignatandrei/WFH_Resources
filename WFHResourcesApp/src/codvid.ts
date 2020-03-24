export class CovidData {
  constructor(c: CovidData= null) {
    if (c == null) {
      return;
    }
    // tslint:disable-next-line: forin
    for (const k in c) { this[k] = c[k]; }
  }
  Country: string;
  Province: string;
  Lat: number;
  Lon: number;
  Date: string;
  Cases: number;
  Status: string;

  RealDate: Date;

}
