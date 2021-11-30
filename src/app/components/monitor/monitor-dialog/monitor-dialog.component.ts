import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MonitorDTO} from "../../../api/dto/MonitorDTO";
import {MonitorService} from "../../../api/services/monitor.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BrandDTO} from "../../../api/dto/BrandDTO";
import {BrandService} from "../../../api/services/brand.service";
import {GlobalService} from "../../../api/services/global.service";

@Component({
  selector: 'app-monitor-dialog',
  templateUrl: './monitor-dialog.component.html',
  styleUrls: ['./monitor-dialog.component.css']
})
export class MonitorDialogComponent implements OnInit {

  isNewMonitor: boolean;
  monitorForm: FormGroup;
  brandList: BrandDTO[] = [];
  private monitor: MonitorDTO;

  constructor(private formBuilder: FormBuilder,
              private monitorService: MonitorService,
              private brandService: BrandService,
              public dialogRef: MatDialogRef<MonitorDialogComponent>,
              public global: GlobalService,
              @Inject(MAT_DIALOG_DATA) public data: MonitorDTO) {
    if (data) {
      this.monitor = data;
      this.isNewMonitor = false;
    } else {
      this.isNewMonitor = true;
      this.monitor = {} as MonitorDTO;
    }
    this.createForm();
    this.initialization().then();
  }

  ngOnInit(): void {
  }

  public async closeDialog() {
    if (this.monitorForm.invalid) {
      return;
    }
    this.assignValue();
    if (!this.isNewMonitor) {
      this.monitorService.updateMonitor(this.monitor, this.monitor.id)
        .then(response => this.dialogRef.close(response))
        .catch(error => console.error(error));
    } else if (this.isNewMonitor) {
      this.monitorService.saveMonitor(this.monitor)
        .then(response => this.dialogRef.close(response))
        .catch(error => console.error(error));
    }
  }

  private async initialization() {
    this.brandService.getAllBrands()
      .then(response => this.brandList = response)
      .catch(error => console.log(error));
  }

  private assignValue() {
    this.monitor.id = this.monitor.id ? this.monitor.id : null;
    this.monitor.name = this.name.value;
    this.monitor.brand = this.brandList.find(brand => brand.id === this.brand.value);
    this.monitor.aspectRatio = this.aspectRatio.value;
    this.monitor.resolution = this.resolution.value;
    this.monitor.panelType = this.panelType.value;
    this.monitor.refreshRate = this.refreshRate.value;
    this.monitor.displaySize = this.displaySize.value;
  }

  private createForm() {
    this.monitorForm = this.formBuilder.group({
      name: [this.monitor.name, [Validators.required]],
      brand: [this.monitor.brand?.id, [Validators.required]],
      aspectRatio: [this.monitor.aspectRatio, [Validators.required]],
      resolution: [this.monitor.resolution, [Validators.required]],
      panelType: [this.monitor.panelType, [Validators.required]],
      refreshRate: [this.monitor.refreshRate, [Validators.required]],
      displaySize: [this.monitor.displaySize, [Validators.required]],
    });
  }

  get name() {return this.monitorForm.get('name') as FormControl; }
  get brand() {return this.monitorForm.get('brand') as FormControl; }
  get aspectRatio() {return this.monitorForm.get('aspectRatio') as FormControl;}
  get resolution() {return this.monitorForm.get('resolution') as FormControl; }
  get panelType() {return this.monitorForm.get('panelType') as FormControl; }
  get refreshRate() {return this.monitorForm.get('refreshRate') as FormControl; }
  get displaySize() {return this.monitorForm.get('displaySize') as FormControl; }
}
