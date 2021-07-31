import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { inherits } from 'util';


interface Currency {
    value: string;
    viewValue: String;
}
export class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      return control.dirty && form.invalid;
    }
  }
export class MyErrorStateMatcher implements ErrorStateMatcher{

    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const invalidCtrl = (control && control.invalid && control.dirty);
      return (invalidCtrl);
    }
  }
export class CommonService {

    constructor() {
     }

    ngOnInit() {
      
    }
    matcher = new MyErrorStateMatcher();
    confirmPassMatcher = new CrossFieldErrorMatcher();
    public passpattern = '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}';
    public geography: string[] = ['Asia Pacific', 'Australia & New Zealand', 'Canada & US', 'Europe & UK', 'US Central', 'US East', 'US West']
    public currencies: Currency[] = [
        { value: 'USD', viewValue: 'USD (US$)' },
        { value: 'EUR', viewValue: 'EUR (€)' },
        { value: 'JPY', viewValue: 'JPY (¥)' },
        { value: 'GBP', viewValue: 'GBP (£)' },
        { value: 'CAD', viewValue: 'CAD (C$)' },
        { value: 'NZD', viewValue: 'NZD (NZ$)' },
        { value: 'SGD', viewValue: 'SGD (S$)' },
        { value: 'HKD', viewValue: 'HKD (HK$)' },
        { value: 'MYR', viewValue: 'MYR (RM)' }
    ]
    public csv="^[A-Za-z]{0,10}(?:,[A-Za-z]{0,10}){0,4}$";
    public emailPattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
    public urlPattern = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;
    public rows = [
        { "Step No.": "1", "Procedural Steps": "Open the Website (using a URL) in a browser", "Test Data": "Site's URL", "Expected Results": "Website HomePage Appears", },
        { "Step No.": "2", "Procedural Steps": "Click on Categories Links on left block", "Test Data": "-", "Expected Results": "Department Page of the category clicked has to be loaded with products.", },
        { "Step No.": "3", "Procedural Steps": "Click on 2nd Level Category in hierarchy", "Test Data": "-", "Expected Results": "Listing Page of the category clicked has to be loaded with products.", },
        { "Step No.": "4", "Procedural Steps": "Search for keyword 'phone' on the search bar", "Test Data": "Select All Categories in the Search Filter", "Expected Results": "Search Listing Page with results matching keyword Phone has to be displayed.", },
        { "Step No.": "5", "Procedural Steps": "On the Homepage, click on View All under Flash Deals section", "Test Data": "-", "Expected Results": "Flash Deals Page with all products on deals should be displayed.", },
        { "Step No.": "6", "Procedural Steps": "Add any Simple, Virtual, Bundle & Configurable product into cart", "Test Data": "Get article numbers for all products to add into cart", "Expected Results": "Cart page loaded with all Simple,Virtual,Bundle & Configurable products", },
        { "Step No.": "7", "Procedural Steps": "Load Simple, Virtual, Bundle & Configurable product page", "Test Data": "Get article numbers for all products to add into cart", "Expected Results": "Product page loaded with all Simple,Virtual,Bundle & Configurable products", },
        { "Step No.": "8", "Procedural Steps": "Add extended warranty in cart", "Test Data": "Execute after scenario 6", "Expected Results": "Extended warranty for all products added and updated in cart.", },
    ]
    public headers = ["Step No.", "Procedural Steps", "Test Data", "Expected Results"];
    public location = [
        { "value": "Corporate / Head Office", "id": "corp.ads.Company.net" },
        { "value": "Company SEZ", "id": "lsz.ads.Company.net" },
        { "value": "Company Solutions", "id": "SLS.ads.Company.net" },
        { "value": "Company Technologies Unit – 2", "id": "T02.ads.Company.net" },
        { "value": "Company Technologies Unit – 3", "id": "T03.ads.Company.net" },
        { "value": "Company Technologies – LLP", "id": "TLP.ads.Company.net" },
        { "value": "PHP / Cebu Office", "id": "php.ads.Company.net" },
        { "value": "Company Romania", "id": "ro.ads.Company.net" }
    ]
}

