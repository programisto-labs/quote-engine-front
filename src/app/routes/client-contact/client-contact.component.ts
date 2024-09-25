import {AfterViewInit, Component, inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {TranslateModule} from "@ngx-translate/core";
import {ClientContact, CONTACT_INFO_KEY, defaultClientContact, LocalStorageService} from "../../shared";
import {MatIcon} from "@angular/material/icon";
import {Subject, takeUntil} from "rxjs";
import {ClientContactService} from "./client-contact.service";


@Component({
  selector: 'app-client-contact',
  templateUrl: 'client-contact.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    ReactiveFormsModule,
    MatIcon
  ],
})
export class ClientContactComponent implements AfterViewInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly storageService: LocalStorageService = inject(LocalStorageService);
  private readonly clientContactService: ClientContactService = inject(ClientContactService);
  private destroy$: Subject<void> = new Subject<void>();

  contactForm: FormGroup;

  constructor() {
    let data: ClientContact = defaultClientContact;
    if (this.storageService.localStorage) {
      data = this.storageService.get(CONTACT_INFO_KEY) as ClientContact;
    }
    this.contactForm = this.fb.nonNullable.group({
      fullname: [data?.fullname || '', [Validators.required]],
      enterprise: [data?.enterprise || '', [Validators.required]],
      email: [data?.email || '', [Validators.required, Validators.email]],
      tele: [data?.tele || '', [Validators.required]],
    });
  }

  ngAfterViewInit() {
    this.contactForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value: ClientContact) => {
        this.clientContactService.updateValue(value);
        this.clientContactService.updateValidStatus(this.contactForm.valid);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  get fullname() {
    return this.contactForm.get('fullname');
  }

  get enterprise() {
    return this.contactForm.get('enterprise');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get tele() {
    return this.contactForm.get('tele');
  }
}
