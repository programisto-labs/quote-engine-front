import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ClientContact, CONTACT_INFO_KEY, defaultClientContact, LocalStorageService} from "../../shared";


@Injectable({
  providedIn: 'root'
})
export class ClientContactService {
  private readonly storageService: LocalStorageService = inject(LocalStorageService);

  contactValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  contactValue: BehaviorSubject<ClientContact> = new BehaviorSubject<ClientContact>(defaultClientContact);

  getContact() {
    let data: ClientContact = defaultClientContact;
    if (this.storageService.localStorage) {
      data = this.storageService.get(CONTACT_INFO_KEY) as ClientContact;
    }
    return data;
  }

  updateValidStatus(value: boolean) {
    this.contactValid.next(value);
  }

  updateValue(value: ClientContact) {
    this.contactValue.next(value);
  }
}
