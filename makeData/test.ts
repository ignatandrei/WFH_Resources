import { country, Countries } from "./countryList";
(async () => {
    try {
      await main();
      console.log("done");
    } catch (e) {
      console.log(e);
      console.log("Error" + JSON.stringify(e));
      throw e;
    }
  })();

async function main() {
    let definitionCountries = Countries;
    definitionCountries.forEach(it=>{
        
      var cc= Dead2017(it.name);
      // if(cc < 0)
      //   console.log(it.name);
      //it["Dead2017"] = cc/10;
      if(it.Dead2017Per1000 != (cc /10))
        console.log(it);
        // var cc= findCountryCode(it.name);
        // if(cc == null)
        //   console.log(it.name);
        // else
        //   console.log(it.countryCode == cc);
          
         //console.log(it);
         //console.log(",");
    })
}
//https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_by_mortality_rate
function Dead2017(cn: string): number{
  switch(cn){
    case 'Afghanistan':return 134;
    case 'Albania':return 64.7;
    case 'Algeria':return 43.1;
    case 'Andorra':return 68.2;
    case 'Angola':return 92;
    case 'Antigua and Barbuda':return 57;
    case 'Argentina':return 73.4;
    case 'Armenia':return 94;
    case 'Australia':return 70.7;
    case 'Austria':return 96;
    case 'Azerbaijan':return 70.9;
    case 'Bahamas':return 70;
    case 'Bahrain':return 26.7;
    case 'Bangladesh':return 56.4;
    case 'Barbados':return 84.1;
    case 'Belarus':return 132;
    case 'Belgium':return 97;
    case 'Belize':return 59.5;
    case 'Benin':return 83.9;
    case 'Bhutan':return 67.8;
    case 'Bolivia':return 65.9;
    case 'Bosnia and Herzegovina':return 100;
    case 'Botswana':return 96;
    case 'Brazil':return 65.4;
    case 'Brunei':return 34.7;
    case 'Bulgaria':return 145;
    case 'Burkina Faso':return 112;
    case 'Burundi':return 88;
    case 'Cambodia':return 61.7;
    case 'Cameroon':return 96;
    case 'Canada':return 87;
    case 'Cabo Verde':return 83.1;
    case 'Central African Republic':return 132;
    case 'Chad':return 138;
    case 'Chile':return 59.3;
    case 'China':return 74.4;
    case 'Colombia':return 53.6;
    case 'Comoros':return 77.6;
    case 'Democratic Republic of the Congo':return 96;
    case 'Congo (Congo-Brazzaville)':return 95;
    case 'Costa Rica':return 44.9;
    case 'Côte d\'Ivoire':return 94;
    case 'Croatia':return 122;
    case 'Cuba':return 76.4;
    case 'Cyprus':return 65.7;
    case 'Czechia (Czech Republic)':return 105;
    case 'Denmark':return 103;
    case 'Djibouti':return 78.4;
    case 'Dominica':return 79.4;
    case 'Dominican Republic':return 45;
    case 'Ecuador':return 50.4;
    case 'Egypt':return 47.7;
    case 'El Salvador':return 56.7;
    case 'Equatorial Guinea':return 83.9;
    case 'Eritrea':return 76.5;
    case 'Estonia':return 126;
    case 'Eswatini (fmr. "Swaziland")':return 132;
    case 'Ethiopia':return 85.2;
    case 'Fiji':return 60;
    case 'Finland':return 100;
    case 'France':return 93;
    case 'Gabon':return 130;
    case 'Gambia':return 72.6;
    case 'Georgia':return 109;
    case 'Germany':return 117;
    case 'Ghana':return 73.7;
    case 'Greece':return 113;
    case 'Grenada':return 80.4;
    case 'Guatemala':return 48.2;
    case 'Guinea':return 90;
    case 'Guinea-Bissau':return 139;
    case 'Guyana':return 73;
    case 'Haiti':return 79.1;
    case 'Honduras':return 51.3;
    case 'Hungary':return 128;
    case 'Iceland':return 71.3;
    case 'India':return 73.5;
    case 'Indonesia':return 63.4;
    case 'Iran':return 59.4;
    case 'Iraq':return 45.7;
    case 'Ireland':return 64.5;
    case 'Israel':return 55.4;
    case 'Italy':return 104;
    case 'Jamaica':return 66.7;
    case 'Japan':return 98;
    case 'Jordan':return 38;
    case 'Kazakhstan':return 83.1;
    case 'Kenya':return 70;
    case 'Kiribati':return 71.8;
    case 'North Korea':return 93;
    case 'South Korea':return 66.3;
    case 'Kuwait':return 21.6;
    case 'Kyrgyzstan':return 67.4;
    case 'Laos':return 77.4;
    case 'Latvia':return 145;
    case 'Lebanon':return 49.5;
    case 'Lesotho':return 150;
    case 'Liberia':return 99;
    case 'Libya':return 35.7;
    case 'Liechtenstein':return 70.2;
    case 'Lithuania':return 146;
    case 'Luxembourg':return 85.3;
    case 'Macedonia':return 92;
    case 'Madagascar':return 69.5;
    case 'Malawi':return 87.4;
    case 'Malaysia':return 50;
    case 'Maldives':return 38.4;
    case 'Mali':return 98;
    case 'Malta':return 94;
    case 'Marshall Islands':return 42.4;
    case 'Mauritania':return 83.5;
    case 'Mauritius':return 68.5;
    case 'Mexico':return 52.4;
    case 'F.S. Micronesia':return 42.5;
    case 'Moldova':return 126;
    case 'Monaco':return 98;
    case 'Mongolia':return 63.8;
    case 'Montenegro':return 97;
    case 'Morocco':return 47.9;
    case 'Mozambique':return 116;
    case 'Myanmar (formerly Burma)':return 80.1;
    case 'Namibia':return 79;
    case 'Nauru':return 59;
    case 'Nepal':return 66.2;
    case 'Netherlands':return 89;
    case 'New Zealand':return 73;
    case 'Nicaragua':return 50.7;
    case 'Niger':return 118;
    case 'Nigeria':return 124;
    case 'Norway':return 81.9;
    case 'Oman':return 33.8;
    case 'Pakistan':return 65.8;
    case 'Palau':return 79.3;
    case 'Palestine/Gaza':return 30.9;
    case 'Panama':return 47.7;
    case 'Papua New Guinea':return 65.3;
    case 'Paraguay':return 46.4;
    case 'Peru':return 59.9;
    case 'Philippines':return 49.2;
    case 'Poland':return 104;
    case 'Portugal':return 111;
    case 'Qatar':return 15.3;
    case 'Romania':return 120;
    case 'Russia':return 135;
    case 'Rwanda':return 91.8;
    case 'Saint Kitts and Nevis':return 70.8;
    case 'Saint Lucia':return 73.2;
    case 'Saint Vincent and the Grenadines':return 71.2;
    case 'Samoa':return 53.2;
    case 'San Marino':return 87;
    case 'São Tomé and Príncipe':return 74.5;
    case 'Saudi Arabia':return 33.2;
    case 'Senegal':return 86.5;
    case 'Serbia':return 136;
    case 'Seychelles':return 69;
    case 'Sierra Leone':return 104;
    case 'Singapore':return 34.2;
    case 'Slovakia':return 99;
    case 'Slovenia':return 116;
    case 'Solomon Islands':return 38.6;
    case 'Somalia':return 131;
    case 'South Africa':return 94;
    case 'South Sudan':return 84.2;
    case 'Spain':return 91;
    case 'Sri Lanka':return 60.6;
    case 'Sudan':return 78.7;
    case 'Suriname':return 61.3;
    case 'Sweden':return 94;
    case 'Switzerland':return 81;
    case 'Syria':return 65.1;
    case 'Taiwan':return 69.7;
    case 'Tajikistan':return 62.8;
    case 'Tanzania':return 82;
    case 'Thailand':return 77.2;
    case 'Timor-Leste':return 61.8;
    case 'Togo':return 74.3;
    case 'Tonga':return 48.6;
    case 'Trinidad and Tobago':return 88;
    case 'Tunisia':return 59.4;
    case 'Turkey':return 61.2;
    case 'Turkmenistan':return 61.6;
    case 'Tuvalu':return 89;
    case 'Uganda':return 102;
    case 'Ukraine':return 144;
    case 'United Arab Emirates':return 19.9;
    case 'United Kingdom':return 94;
    case 'United States of America':return 81.5;
    case 'Uruguay':return 94;
    case 'Uzbekistan':return 52.9;
    case 'Vanuatu':return 41.4;
    case 'Venezuela':return 52.7;
    case 'Vietnam':return 59.3;
    case 'Western Sahara (Sahrawi)':return 84.9;
    case 'Yemen':return 64.5;
    case 'Zambia':return 122;
    case 'Zimbabwe':return 102;
    case 'Anguilla (UK)':return 45.4;
    case 'Aruba (Netherlands)':return 80.9;
    case 'Bermuda (UK)':return 80.6;
    case 'Cayman Islands (UK)':return 54.1;
    case 'Guernsey (Channel Islands, UK)':return 90;
    case 'Jersey (Channel Islands, UK)':return 76.3;
    case 'Cook Islands (New Zealand)':return 78;
    case 'Curaçao (Netherlands)':return 80;
    case 'Falkland Islands/Malvinas':return 0;
    case 'Faroe Islands (Denmark)':return 88;
    case 'Gibraltar (UK)':return 83.3;
    case 'Greenland (Denmark)':return 87;
    case 'Guadeloupe (France)':return 0;
    case 'Guam':return 50.4;
    case 'French Guiana':return 0;
    case 'Hong Kong':return 69.3;
    case 'Isle of Man (UK)':return 102;
    case 'Kosovo':return 0;
    case 'Macau':return 41;
    case 'Martinique (France)':return 0;
    case 'Mayotte (France)':return 0;
    case 'Montserrat (UK)':return 65.2;
    case 'New Caledonia (France)':return 54.5;
    case 'Niue (New Zealand)':return 0;
    case 'Northern Mariana Islands (USA)':return 36.1;
    case 'Palestine/West Bank':return 35.1;
    case 'Pitcairn Islands (UK)':return 0;
    case 'French Polynesia':return 49.3;
    case 'Puerto Rico (USA)':return 85.1;
    case 'Réunion (France)':return 0;
    case 'Saint Barthélemy (France)':return 0;
    case 'Saint Helena & dependencies (UK)':return 73.3;
    case 'Saint Martin':return 0;
    case 'Saint Pierre and Miquelon (France)':return 99;
    case 'American Samoa':return 46.8;
    case 'Sint Maarten (Netherlands)':return 45.1;
    case 'Tokelau (New Zealand)':return 0;
    case 'Turks and Caicos Islands (UK)':return 30.8;
    case 'British Virgin Islands':return 49.3;
    case 'U.S. Virgin Islands':return 82.4;
    case 'Wallis and Futuna (France)':return 49.5;
       
  }
  return -1;
}

function findCountryCode(name:string):string{
    switch(name){
        case 'Afghanistan': return 'AF';
case 'Åland Islands': return 'AX';
case 'Albania': return 'AL';
case 'Algeria': return 'DZ';
case 'American Samoa': return 'AS';
case 'Andorra': return 'AD';
case 'Angola': return 'AO';
case 'Anguilla': return 'AI';
case 'Antarctica': return 'AQ';
case 'Antigua and Barbuda': return 'AG';
case 'Argentina': return 'AR';
case 'Armenia': return 'AM';
case 'Aruba': return 'AW';
case 'Australia': return 'AU';
case 'Austria': return 'AT';
case 'Azerbaijan': return 'AZ';
case 'Bahamas': return 'BS';
case 'Bahrain': return 'BH';
case 'Bangladesh': return 'BD';
case 'Barbados': return 'BB';
case 'Belarus': return 'BY';
case 'Belgium': return 'BE';
case 'Belize': return 'BZ';
case 'Benin': return 'BJ';
case 'Bermuda': return 'BM';
case 'Bhutan': return 'BT';
case 'Bolivia': return 'BO';
case 'Bonaire, Sint Eustatius and Saba': return 'BQ';
case 'Bosnia and Herzegovina': return 'BA';
case 'Botswana': return 'BW';
case 'Bouvet Island': return 'BV';
case 'Brazil': return 'BR';
case 'British Indian Ocean Territory (the)': return 'IO';
case 'Brunei': return 'BN';
case 'Bulgaria': return 'BG';
case 'Burkina Faso': return 'BF';
case 'Burundi': return 'BI';
case 'Cabo Verde': return 'CV';
case 'Cambodia': return 'KH';
case 'Cameroon': return 'CM';
case 'Canada': return 'CA';
case 'Cayman Islands (the)': return 'KY';
case 'Central African Republic': return 'CF';
case 'Chad': return 'TD';
case 'Chile': return 'CL';
case 'China': return 'CN';
case 'Christmas Island': return 'CX';
case 'Cocos (Keeling) Islands (the)': return 'CC';
case 'Colombia': return 'CO';
case 'Comoros': return 'KM';
case 'Democratic Republic of the Congo': return 'CD';
case 'Congo (Congo-Brazzaville)': return 'CG';
case 'Cook Islands (the)': return 'CK';
case 'Costa Rica': return 'CR';
case 'Côte d\'Ivoire': return 'CI';
case 'Croatia': return 'HR';
case 'Cuba': return 'CU';
case 'Curaçao': return 'CW';
case 'Cyprus': return 'CY';
case 'Czechia (Czech Republic)': return 'CZ';
case 'Denmark': return 'DK';
case 'Djibouti': return 'DJ';
case 'Dominica': return 'DM';
case 'Dominican Republic': return 'DO';
case 'Ecuador': return 'EC';
case 'Egypt': return 'EG';
case 'El Salvador': return 'SV';
case 'Equatorial Guinea': return 'GQ';
case 'Eritrea': return 'ER';
case 'Estonia': return 'EE';
case 'Eswatini (fmr. "Swaziland")': return 'SZ';
case 'Ethiopia': return 'ET';
case 'Falkland Islands (the) [Malvinas]': return 'FK';
case 'Faroe Islands (the)': return 'FO';
case 'Fiji': return 'FJ';
case 'Finland': return 'FI';
case 'France': return 'FR';
case 'French Guiana': return 'GF';
case 'French Polynesia': return 'PF';
case 'French Southern Territories (the)': return 'TF';
case 'Gabon': return 'GA';
case 'Gambia': return 'GM';
case 'Georgia': return 'GE';
case 'Germany': return 'DE';
case 'Ghana': return 'GH';
case 'Gibraltar': return 'GI';
case 'Greece': return 'GR';
case 'Greenland': return 'GL';
case 'Grenada': return 'GD';
case 'Guadeloupe': return 'GP';
case 'Guam': return 'GU';
case 'Guatemala': return 'GT';
case 'Guernsey': return 'GG';
case 'Guinea': return 'GN';
case 'Guinea-Bissau': return 'GW';
case 'Guyana': return 'GY';
case 'Haiti': return 'HT';
case 'Heard Island and McDonald Islands': return 'HM';
case 'Holy See': return 'VA';
case 'Vatican': return 'VA';
case 'Honduras': return 'HN';
case 'Hong Kong': return 'HK';
case 'Hungary': return 'HU';
case 'Iceland': return 'IS';
case 'India': return 'IN';
case 'Indonesia': return 'ID';
case 'Iran': return 'IR';
case 'Iraq': return 'IQ';
case 'Ireland': return 'IE';
case 'Isle of Man': return 'IM';
case 'Israel': return 'IL';
case 'Italy': return 'IT';
case 'Jamaica': return 'JM';
case 'Japan': return 'JP';
case 'Jersey': return 'JE';
case 'Jordan': return 'JO';
case 'Kazakhstan': return 'KZ';
case 'Kenya': return 'KE';
case 'Kiribati': return 'KI';
case 'North Korea': return 'KP';
case 'South Korea': return 'KR';
case 'Kosovo': return 'XK';
case 'Kuwait': return 'KW';
case 'Kyrgyzstan': return 'KG';
case 'Laos': return 'LA';
case 'Latvia': return 'LV';
case 'Lebanon': return 'LB';
case 'Lesotho': return 'LS';
case 'Liberia': return 'LR';
case 'Libya': return 'LY';
case 'Liechtenstein': return 'LI';
case 'Lithuania': return 'LT';
case 'Luxembourg': return 'LU';
case 'Macao': return 'MO';
case 'North Macedonia': return 'MK';
case 'Madagascar': return 'MG';
case 'Malawi': return 'MW';
case 'Malaysia': return 'MY';
case 'Maldives': return 'MV';
case 'Mali': return 'ML';
case 'Malta': return 'MT';
case 'Marshall Islands': return 'MH';
case 'Martinique': return 'MQ';
case 'Mauritania': return 'MR';
case 'Mauritius': return 'MU';
case 'Mayotte': return 'YT';
case 'Mexico': return 'MX';
case 'Micronesia': return 'FM';
case 'Moldova': return 'MD';
case 'Monaco': return 'MC';
case 'Mongolia': return 'MN';
case 'Montenegro': return 'ME';
case 'Montserrat': return 'MS';
case 'Morocco': return 'MA';
case 'Mozambique': return 'MZ';
case 'Myanmar (formerly Burma)': return 'MM';
case 'Namibia': return 'NA';
case 'Nauru': return 'NR';
case 'Nepal': return 'NP';
case 'Netherlands': return 'NL';
case 'New Caledonia': return 'NC';
case 'New Zealand': return 'NZ';
case 'Nicaragua': return 'NI';
case 'Niger': return 'NE';
case 'Nigeria': return 'NG';
case 'Niue': return 'NU';
case 'Norfolk Island': return 'NF';
case 'Northern Mariana Islands (the)': return 'MP';
case 'Norway': return 'NO';
case 'Oman': return 'OM';
case 'Pakistan': return 'PK';
case 'Palau': return 'PW';
case 'Palestine State': return 'PS';
case 'Panama': return 'PA';
case 'Papua New Guinea': return 'PG';
case 'Paraguay': return 'PY';
case 'Peru': return 'PE';
case 'Philippines': return 'PH';
case 'Pitcairn': return 'PN';
case 'Poland': return 'PL';
case 'Portugal': return 'PT';
case 'Puerto Rico': return 'PR';
case 'Qatar': return 'QA';
case 'Réunion': return 'RE';
case 'Romania': return 'RO';
case 'Russia': return 'RU';
case 'Rwanda': return 'RW';
case 'Saint Barthélemy': return 'BL';
case 'Saint Helena, Ascension and Tristan da Cunha': return 'SH';
case 'Saint Kitts and Nevis': return 'KN';
case 'Saint Lucia': return 'LC';
case 'Saint Martin': return 'MF';
case 'Saint Pierre and Miquelon': return 'PM';
case 'Saint Vincent and the Grenadines': return 'VC';
case 'Samoa': return 'WS';
case 'San Marino': return 'SM';
case 'Sao Tome and Principe': return 'ST';
case 'Saudi Arabia': return 'SA';
case 'Senegal': return 'SN';
case 'Serbia': return 'RS';
case 'Seychelles': return 'SC';
case 'Sierra Leone': return 'SL';
case 'Singapore': return 'SG';
case 'Sint Maarten (Dutch part)': return 'SX';
case 'Slovakia': return 'SK';
case 'Slovenia': return 'SI';
case 'Solomon Islands': return 'SB';
case 'Somalia': return 'SO';
case 'South Africa': return 'ZA';
case 'South Georgia and the South Sandwich Islands': return 'GS';
case 'South Sudan': return 'SS';
case 'Spain': return 'ES';
case 'Sri Lanka': return 'LK';
case 'Sudan': return 'SD';
case 'Suriname': return 'SR';
case 'Svalbard and Jan Mayen': return 'SJ';
case 'Sweden': return 'SE';
case 'Switzerland': return 'CH';
case 'Syria': return 'SY';
case 'Taiwan (Province of China)': return 'TW';
case 'Tajikistan': return 'TJ';
case 'Tanzania': return 'TZ';
case 'Thailand': return 'TH';
case 'Timor-Leste': return 'TL';
case 'Togo': return 'TG';
case 'Tokelau': return 'TK';
case 'Tonga': return 'TO';
case 'Trinidad and Tobago': return 'TT';
case 'Tunisia': return 'TN';
case 'Turkey': return 'TR';
case 'Turkmenistan': return 'TM';
case 'Turks and Caicos Islands (the)': return 'TC';
case 'Tuvalu': return 'TV';
case 'Uganda': return 'UG';
case 'Ukraine': return 'UA';
case 'United Arab Emirates': return 'AE';
case 'United Kingdom': return 'GB';
case 'United States Minor Outlying Islands (the)': return 'UM';
case 'United States of America': return 'US';
case 'Uruguay': return 'UY';
case 'Uzbekistan': return 'UZ';
case 'Vanuatu': return 'VU';
case 'Venezuela': return 'VE';
case 'Vietnam': return 'VN';
case 'Virgin Islands (British)': return 'VG';
case 'Virgin Islands (U.S.)': return 'VI';
case 'Wallis and Futuna': return 'WF';
case 'Western Sahara': return 'EH';
case 'Yemen': return 'YE';
case 'Zambia': return 'ZM';
case 'Zimbabwe': return 'ZW';

    }
    return null;
}