import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../api/services/global.service";
import {Roles} from "../../config/Roles";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  roles = Roles;

  constructor(public global: GlobalService) { }

  ngOnInit(): void {

  }

  logout() {
    this.global.logout();
  }

}
