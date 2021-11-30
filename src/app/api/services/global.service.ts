import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public isLoggedInStatus = new BehaviorSubject<boolean>(false);

  windowWidth: number;

  constructor() { }
}
