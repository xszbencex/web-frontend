import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {BrandDTO} from "../../api/dto/BrandDTO";
import {MatDialog} from "@angular/material/dialog";
import {BrandService} from "../../api/services/brand.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BrandDialogComponent} from "./brand-dialog/brand-dialog.component";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  brandDataSource: MatTableDataSource<BrandDTO> | undefined;
  displayedColumns: string[] = ['name', 'headquarters', 'ceo', 'actions'];

  constructor(private dialog: MatDialog,
              private brandService: BrandService,
              private snackBar: MatSnackBar) {
    this.initialization().then();
  }

  ngOnInit(): void {
  }

  dialogInit(brandId: string) {
    if (brandId) {
      this.brandService.getBrandById(brandId)
        .then(response => this.openDialog(response))
        .catch(error => console.error(error));
    } else {
      this.openDialog();
    }
  }

  deleteBrand(brandId: number) {
    this.brandService.deleteBrand(brandId)
      .then(() => {
        this.snackBar.open("Márka sikeresen törölve!", "Bezár", {duration: 2000});
        this.initialization().then();
      })
      .catch(error => console.log(error))
  }

  private openDialog(brand?: BrandDTO) {
    this.dialog.open(BrandDialogComponent,
      {data: brand, width: '700px'}
    ).afterClosed().subscribe(result => {
      if ( result ) {
        this.initialization().then();
        this.snackBar.open(`Márka sikeresen ${brand ? "módosítva" : "létrehozva"}!`, "Bezár",
          {duration: 2000});
      }
    });
  }

  private async initialization() {
    await this.brandService.getAllBrands()
      .then(response => {
        this.brandDataSource = new MatTableDataSource<BrandDTO>(response);
        this.brandDataSource.sort = this.sort;
        this.brandDataSource.paginator = this.paginator;
      }).catch(error => console.error(error));
  }
}
