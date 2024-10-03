import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { ShopFormService } from 'src/app/services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl(' '),
    lastName: new FormControl(' '),
    email: new FormControl(' '),
  });

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private shopService: ShopFormService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [' '],
        city: [' '],
        state: [' '],
        country: [''],
        zipCode: [' '],
      }),
      billingAddress: this.formBuilder.group({
        street: [' '],
        city: [' '],
        state: [' '],
        country: [''],
        zipCode: [' '],
      }),
      creditCardInformation: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        cvv: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
    // Populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log(`startMonth: ${startMonth}`);
    this.shopService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log(`Retrieved credit card months: ` + JSON.stringify(data));
      this.creditCardMonths = data;
    });
    // Populate credit card Years
    this.shopService.getCreditCardYears().subscribe((data) => {
      console.log(`Retrieved credit card years: ` + JSON.stringify(data));
      this.creditCardYears = data;
    });

    this.shopService.getCountries().subscribe((data) => {
      console.log('Retrieved countries: ' + JSON.stringify(data));
      this.countries = data;
    });
  }

  onSubmit() {
    console.log(`Handling the submit button`);
    console.log(this.checkoutFormGroup.value);
    console.log(
      `The email address is ${
        this.checkoutFormGroup.get('customer')?.value.email
      }`
    );
    console.log(
      `The shipping addres country ${
        this.checkoutFormGroup.get('shippingAddress')?.value.country.name
      }`
    );
    console.log(
      `The shipping addres state ${
        this.checkoutFormGroup.get('shippingAddress')?.value.state.name
      }`
    );
  }

  copyShippingAddressToBillingAddress($event: any) {
    if ($event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get(
      'creditCardInformation'
    );
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear
    );

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.shopService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log(`Retrieved credit card months: ` + JSON.stringify(data));
      this.creditCardMonths = data;
    });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.shopService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }

      // Select first item by default
      formGroup?.get('state')?.setValue(data[0]);
    });
  }
}
