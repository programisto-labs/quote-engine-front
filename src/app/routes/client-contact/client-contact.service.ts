import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ClientContact, defaultClientContact} from "../../shared";


@Injectable({
  providedIn: 'root'
})
export class ClientContactService {
  contactValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  contactValue: BehaviorSubject<ClientContact> = new BehaviorSubject<ClientContact>(defaultClientContact);

  updateValidStatus(value: boolean) {
    this.contactValid.next(value);
  }

  updateValue(value: ClientContact) {
    this.contactValue.next(value);
  }
}
