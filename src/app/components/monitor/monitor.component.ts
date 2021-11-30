import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MonitorDTO} from "../../api/dto/MonitorDTO";
import {MatDialog} from "@angular/material/dialog";
import {MonitorService} from "../../api/services/monitor.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MonitorDialogComponent} from "./monitor-dialog/monitor-dialog.component";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  monitorDataSource: MatTableDataSource<MonitorDTO> | undefined;
  displayedColumns: string[] = ['name', 'brand', 'aspectRatio', 'resolution', 'panelType', 'refreshRate', 'displaySize', 'actions'];

  constructor(private dialog: MatDialog,
              private monitorService: MonitorService,
              private snackBar: MatSnackBar) {
    this.initialization().then();
  }

  ngOnInit(): void {
  }

  dialogInit(monitorId: string) {
    if (monitorId) {
      this.monitorService.getMonitorById(monitorId)
        .then(response => this.openDialog(response))
        .catch(error => console.error(error));
    } else {
      this.openDialog();
    }
  }

  deleteMonitor(monitorId: number) {
    this.monitorService.deleteMonitor(monitorId)
      .then(() => {
        this.snackBar.open("Monitor sikeresen törölve!", "Bezár", {duration: 2000});
        this.initialization().then();
      })
      .catch(error => console.log(error))
  }

  private openDialog(monitor?: MonitorDTO) {
    this.dialog.open(MonitorDialogComponent,
      {data: monitor, width: '700px'}
    ).afterClosed().subscribe(result => {
      if ( result ) {
        this.initialization().then();
        this.snackBar.open(`Monitor sikeresen ${monitor ? "módosítva" : "létrehozva"}!`, "Bezár",
          {duration: 2000})
      }
    });
  }

  private async initialization() {
    await this.monitorService.getAllMonitors()
      .then(response => {
        this.monitorDataSource = new MatTableDataSource<MonitorDTO>(response);
        this.monitorDataSource.sort = this.sort;
        this.monitorDataSource.paginator = this.paginator;
      }).catch(error => console.error(error));
  }

}
