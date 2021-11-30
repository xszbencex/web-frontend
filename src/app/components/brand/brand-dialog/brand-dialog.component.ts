import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BrandService} from "../../../api/services/brand.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BrandDTO} from "../../../api/dto/BrandDTO";
import {GlobalService} from "../../../api/services/global.service";

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.css']
})
export class BrandDialogComponent implements OnInit {

  isNewBrand: boolean;
  brandForm: FormGroup;
  private brand: BrandDTO;

  constructor(private formBuilder: FormBuilder,
              private brandService: BrandService,
              public global: GlobalService,
              public dialogRef: MatDialogRef<BrandDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BrandDTO) {
    if (data) {
      this.brand = data;
      this.isNewBrand = false;
    } else {
      this.isNewBrand = true;
      this.brand = {} as BrandDTO;
    }
    this.createForm();
  }

  ngOnInit(): void {
  }

  public async closeDialog() {
    if (this.brandForm.invalid) {
      return;
    }
    this.assignValue();
    if (!this.isNewBrand) {
      this.brandService.updateBrand(this.brand, this.brand.id)
        .then(response => this.dialogRef.close(response))
        .catch(error => console.error(error));
    } else if (this.isNewBrand) {
      this.brandService.saveBrand(this.brand)
        .then(response => this.dialogRef.close(response))
        .catch(error => console.error(error));
    }
  }

  private assignValue() {
    this.brand.id = this.brand.id ? this.brand.id : null;
    this.brand.name = this.name.value;
    this.brand.ceo = this.ceo.value;
    this.brand.headquarters = this.headquarters.value;
  }

  private createForm() {
    this.brandForm = this.formBuilder.group({
      name: [this.brand.name, [Validators.required]],
      headquarters: [this.brand.headquarters, [Validators.required]],
      ceo: [this.brand.ceo, []]
    });
  }

  get name() {return this.brandForm.get('name') as FormControl; }
  get ceo() {return this.brandForm.get('ceo') as FormControl; }
  get headquarters() {return this.brandForm.get('headquarters') as FormControl; }

}
