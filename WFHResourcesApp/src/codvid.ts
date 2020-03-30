export class CovidData {
  constructor(c: CovidData= null) {
    if (c == null) {
      return;
    }
    // tslint:disable-next-line: forin
    for (const k in c) { this[k] = c[k]; }
  }
  public Country = '';
  public Province = '';
  public Lat = 0;
  public Lon = 0;
  public Date = '';
  public Cases = 0;
  public Status = '';
  public RealDate: Date = new Date();

}
