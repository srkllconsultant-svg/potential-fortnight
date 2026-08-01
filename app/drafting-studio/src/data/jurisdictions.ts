export interface StateRegion {
  name: string;
  districtsOrCounties: string[];
  cities: string[];
}

export interface CountryJurisdiction {
  code: string;
  name: string;
  currencySymbol: string;
  currencyCode: 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'CAD' | 'AUD' | 'SGD' | string;
  defaultGoverningLaw: string;
  states: StateRegion[];
}

export const GLOBAL_JURISDICTIONS: CountryJurisdiction[] = [
  {
    code: 'IN',
    name: 'India',
    currencySymbol: '₹',
    currencyCode: 'INR',
    defaultGoverningLaw: 'Transfer of Property Act 1882, Indian Registration Act 1908, Indian Stamp Act 1899',
    states: [
      { 
        name: 'Maharashtra', 
        districtsOrCounties: ['Pune District', 'Mumbai City & Suburban', 'Thane District', 'Nagpur District', 'Nashik District', 'Chhatrapati Sambhajinagar', 'Solapur', 'Kolhapur', 'Raigad (Navi Mumbai)', 'Satara'], 
        cities: ['Mumbai', 'Pune', 'Thane', 'Navi Mumbai', 'Nagpur', 'Nashik', 'Chhatrapati Sambhajinagar', 'Solapur', 'Kolhapur', 'Pimpri-Chinchwad'] 
      },
      { 
        name: 'Karnataka', 
        districtsOrCounties: ['Bengaluru Urban', 'Bengaluru Rural', 'Mysuru District', 'Dakshina Kannada (Mangaluru)', 'Dharwad', 'Belagavi', 'Kalaburagi', 'Udupi'], 
        cities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi-Dharwad', 'Belagavi', 'Kalaburagi', 'Udupi', 'Davanagere'] 
      },
      { 
        name: 'Delhi (NCR)', 
        districtsOrCounties: ['New Delhi District', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'Gurugram (Haryana)', 'Gautam Buddha Nagar / Noida (UP)', 'Faridabad (Haryana)', 'Ghaziabad (UP)'], 
        cities: ['New Delhi', 'South Delhi', 'North Delhi', 'Gurugram', 'Noida', 'Faridabad', 'Ghaziabad', 'Greater Noida'] 
      },
      { 
        name: 'Tamil Nadu', 
        districtsOrCounties: ['Chennai District', 'Coimbatore District', 'Madurai District', 'Tiruchirappalli', 'Salem District', 'Tirunelveli', 'Kanchipuram', 'Chengalpattu'], 
        cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Kanchipuram', 'Vellore'] 
      },
      { 
        name: 'Telangana', 
        districtsOrCounties: ['Hyderabad District', 'Medchal-Malkajgiri', 'Rangareddy', 'Warangal Urban', 'Nizamabad', 'Karimnagar', 'Khammam'], 
        cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Secunderabad'] 
      },
      { 
        name: 'Uttar Pradesh', 
        districtsOrCounties: ['Lucknow District', 'Kanpur Nagar', 'Varanasi District', 'Agra District', 'Gautam Buddha Nagar (Noida)', 'Ghaziabad District', 'Prayagraj (Allahabad)', 'Gorakhpur'], 
        cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj', 'Noida', 'Ghaziabad', 'Gorakhpur', 'Meerut'] 
      },
      { 
        name: 'West Bengal', 
        districtsOrCounties: ['Kolkata District', 'North 24 Parganas', 'South 24 Parganas', 'Howrah District', 'Darjeeling', 'Paschim Bardhaman'], 
        cities: ['Kolkata', 'Howrah', 'Siliguri', 'Durgapur', 'Asansol', 'Kharagpur'] 
      },
      { 
        name: 'Gujarat', 
        districtsOrCounties: ['Ahmedabad District', 'Surat District', 'Vadodara District', 'Rajkot District', 'Bhavnagar', 'Gandhinagar'], 
        cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Gandhinagar', 'Jamnagar'] 
      },
      { 
        name: 'Rajasthan', 
        districtsOrCounties: ['Jaipur District', 'Jodhpur District', 'Udaipur District', 'Kota District', 'Bikaner', 'Ajmer'], 
        cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Bhilwara'] 
      },
      { 
        name: 'Kerala', 
        districtsOrCounties: ['Thiruvananthapuram', 'Ernakulam (Kochi)', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad'], 
        cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Alappuzha'] 
      },
      { 
        name: 'Punjab', 
        districtsOrCounties: ['Ludhiana District', 'Amritsar District', 'Jalandhar District', 'Patiala District', 'SAS Nagar (Mohali)'], 
        cities: ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Mohali'] 
      },
      { 
        name: 'Haryana', 
        districtsOrCounties: ['Gurugram District', 'Faridabad District', 'Panchkula', 'Ambala', 'Karnal', 'Hisar'], 
        cities: ['Gurugram', 'Faridabad', 'Panchkula', 'Ambala', 'Karnal', 'Hisar', 'Sonipat'] 
      },
      { 
        name: 'Madhya Pradesh', 
        districtsOrCounties: ['Bhopal District', 'Indore District', 'Gwalior District', 'Jabalpur District', 'Ujjain'], 
        cities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar'] 
      },
      { 
        name: 'Andhra Pradesh', 
        districtsOrCounties: ['Visakhapatnam District', 'NTR District (Vijayawada)', 'Guntur District', 'Tirupati District', 'Nellore'], 
        cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore', 'Kakinada'] 
      },
      { 
        name: 'Goa', 
        districtsOrCounties: ['North Goa District', 'South Goa District'], 
        cities: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'] 
      }
    ]
  },
  {
    code: 'US',
    name: 'United States',
    currencySymbol: '$',
    currencyCode: 'USD',
    defaultGoverningLaw: 'State Real Property Law & Uniform Commercial Code (UCC)',
    states: [
      { 
        name: 'California', 
        districtsOrCounties: ['Los Angeles County', 'San Francisco County', 'Santa Clara County', 'San Diego County', 'Sacramento County', 'Alameda County', 'Orange County', 'Contra Costa County'], 
        cities: ['Los Angeles', 'San Francisco', 'San Jose', 'San Diego', 'Sacramento', 'Oakland', 'Irvine', 'Fremont'] 
      },
      { 
        name: 'New York', 
        districtsOrCounties: ['New York County (Manhattan)', 'Kings County (Brooklyn)', 'Queens County', 'Bronx County', 'Erie County', 'Monroe County', 'Albany County'], 
        cities: ['New York City', 'Buffalo', 'Rochester', 'Syracuse', 'Albany', 'Yonkers'] 
      },
      { 
        name: 'Texas', 
        districtsOrCounties: ['Harris County (Houston)', 'Dallas County', 'Travis County (Austin)', 'Bexar County (San Antonio)', 'Tarrant County (Fort Worth)', 'El Paso County'], 
        cities: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth', 'El Paso', 'Arlington'] 
      },
      { 
        name: 'Florida', 
        districtsOrCounties: ['Miami-Dade County', 'Orange County (Orlando)', 'Hillsborough County (Tampa)', 'Duval County', 'Broward County', 'Palm Beach County'], 
        cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Fort Lauderdale', 'Tallahassee'] 
      },
      { 
        name: 'Illinois', 
        districtsOrCounties: ['Cook County (Chicago)', 'DuPage County', 'Will County', 'Lake County', 'Winnebago County'], 
        cities: ['Chicago', 'Aurora', 'Naperville', 'Joliet', 'Rockford', 'Springfield'] 
      },
      { 
        name: 'Washington', 
        districtsOrCounties: ['King County (Seattle)', 'Spokane County', 'Pierce County (Tacoma)', 'Snohomish County', 'Thurston County'], 
        cities: ['Seattle', 'Spokane', 'Tacoma', 'Bellevue', 'Olympia', 'Everett'] 
      },
      { 
        name: 'Massachusetts', 
        districtsOrCounties: ['Suffolk County (Boston)', 'Worcester County', 'Hampden County', 'Middlesex County'], 
        cities: ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell'] 
      },
      { 
        name: 'Delaware', 
        districtsOrCounties: ['New Castle County', 'Kent County', 'Sussex County'], 
        cities: ['Wilmington', 'Dover', 'Newark'] 
      },
      { 
        name: 'Nevada', 
        districtsOrCounties: ['Clark County (Las Vegas)', 'Washoe County (Reno)', 'Carson City County'], 
        cities: ['Las Vegas', 'Reno', 'Henderson', 'Carson City'] 
      },
      { 
        name: 'Georgia', 
        districtsOrCounties: ['Fulton County (Atlanta)', 'Chatham County (Savannah)', 'Richmond County', 'Muscogee County'], 
        cities: ['Atlanta', 'Savannah', 'Augusta', 'Columbus'] 
      }
    ]
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    currencySymbol: '£',
    currencyCode: 'GBP',
    defaultGoverningLaw: 'Law of Property Act 1925 & Land Registration Act 2002 (England & Wales)',
    states: [
      { 
        name: 'England & Wales', 
        districtsOrCounties: ['Greater London', 'Greater Manchester', 'West Midlands', 'West Yorkshire', 'Bristol County', 'Merseyside', 'Cardiff County'], 
        cities: ['London', 'Birmingham', 'Manchester', 'Leeds', 'Bristol', 'Liverpool', 'Cardiff'] 
      },
      { 
        name: 'Scotland', 
        districtsOrCounties: ['City of Edinburgh', 'Glasgow City', 'Aberdeenshire', 'Dundee City', 'Highland'], 
        cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Inverness'] 
      },
      { 
        name: 'Northern Ireland', 
        districtsOrCounties: ['Belfast District', 'Derry & Strabane', 'Lisburn & Castlereagh', 'Newry Mourne & Down'], 
        cities: ['Belfast', 'Derry', 'Lisburn', 'Newry'] 
      }
    ]
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    currencySymbol: 'AED ',
    currencyCode: 'AED',
    defaultGoverningLaw: 'UAE Civil Code & Dubai Land Department (DLD) Regulations / DIFC Laws',
    states: [
      { 
        name: 'Dubai Emirate', 
        districtsOrCounties: ['Downtown Dubai Zone', 'Dubai Marina & JBR', 'Business Bay Zone', 'DIFC Freezone', 'Jumeirah Zone', 'Deira & Bur Dubai'], 
        cities: ['Dubai Downtown', 'Dubai Marina', 'Business Bay', 'DIFC', 'Jumeirah', 'Deira', 'Jebel Ali'] 
      },
      { 
        name: 'Abu Dhabi Emirate', 
        districtsOrCounties: ['Abu Dhabi Island Sector', 'Al Ain Region', 'Yas & Saadiyat Investment Zones', 'Al Dhafra Region'], 
        cities: ['Abu Dhabi City', 'Al Ain', 'Yas Island', 'Saadiyat Island', 'Ruwais'] 
      },
      { 
        name: 'Sharjah Emirate', 
        districtsOrCounties: ['Sharjah Metropolitan Area', 'Khor Fakkan Sector', 'Kalba Sector'], 
        cities: ['Sharjah City', 'Khor Fakkan', 'Kalba'] 
      },
      { 
        name: 'Ras Al Khaimah', 
        districtsOrCounties: ['RAK City District', 'Al Marjan Island Sector'], 
        cities: ['RAK City', 'Al Marjan Island', 'Al Hamra'] 
      }
    ]
  },
  {
    code: 'CA',
    name: 'Canada',
    currencySymbol: 'CA$',
    currencyCode: 'CAD',
    defaultGoverningLaw: 'Provincial Property Law & Land Titles Act',
    states: [
      { 
        name: 'Ontario', 
        districtsOrCounties: ['Toronto Division', 'Ottawa Region', 'Peel Region (Mississauga/Brampton)', 'Hamilton Region', 'York Region'], 
        cities: ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton', 'Markham'] 
      },
      { 
        name: 'British Columbia', 
        districtsOrCounties: ['Metro Vancouver District', 'Capital Regional District (Victoria)', 'Central Okanagan'], 
        cities: ['Vancouver', 'Victoria', 'Surrey', 'Burnaby', 'Kelowna', 'Richmond'] 
      },
      { 
        name: 'Alberta', 
        districtsOrCounties: ['Calgary Metropolitan Region', 'Edmonton Metropolitan Region', 'Red Deer County'], 
        cities: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge'] 
      },
      { 
        name: 'Quebec', 
        districtsOrCounties: ['Montreal Region', 'Quebec City Region', 'Laval Region', 'Outaouais (Gatineau)'], 
        cities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau'] 
      }
    ]
  },
  {
    code: 'AU',
    name: 'Australia',
    currencySymbol: 'A$',
    currencyCode: 'AUD',
    defaultGoverningLaw: 'Torrens Title System & Real Property Act',
    states: [
      { 
        name: 'New South Wales', 
        districtsOrCounties: ['City of Sydney LGA', 'Newcastle Region', 'Wollongong LGA', 'Central Coast Region'], 
        cities: ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast', 'Parramatta'] 
      },
      { 
        name: 'Victoria', 
        districtsOrCounties: ['City of Melbourne LGA', 'Greater Geelong Region', 'Ballarat Region', 'Greater Bendigo'], 
        cities: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo'] 
      },
      { 
        name: 'Queensland', 
        districtsOrCounties: ['Brisbane LGA', 'Gold Coast LGA', 'Sunshine Coast Region', 'Cairns Regional Council'], 
        cities: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Cairns', 'Townsville'] 
      },
      { 
        name: 'Western Australia', 
        districtsOrCounties: ['City of Perth LGA', 'City of Fremantle', 'Peel Region (Mandurah)'], 
        cities: ['Perth', 'Fremantle', 'Mandurah'] 
      }
    ]
  },
  {
    code: 'SG',
    name: 'Singapore',
    currencySymbol: 'S$',
    currencyCode: 'SGD',
    defaultGoverningLaw: 'Singapore Land Titles Act & Contracts Act',
    states: [
      { 
        name: 'Central Region', 
        districtsOrCounties: ['Central Business District (CBD)', 'Marina Bay Sector', 'Orchard Road Sector', 'Tanjong Pagar Sector'], 
        cities: ['Raffles Place', 'Marina Bay', 'Orchard', 'Tanjong Pagar', 'Bugis'] 
      },
      { 
        name: 'East / West / North Regions', 
        districtsOrCounties: ['Jurong Industrial & Tech Hub', 'Tampines Hub', 'Woodlands Gateway', 'Changi Sector'], 
        cities: ['Jurong East', 'Tampines', 'Woodlands', 'Changi', 'Punggol'] 
      }
    ]
  }
];

