import {Component, Inject, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {TranslateModule} from "@ngx-translate/core";
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle
} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";


@Component({
  selector: 'dialog-client-contact',
  styles: `
    .demo-full-width {
      width: 100%;
    }
  `,
  templateUrl: 'dialog-client-contact.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardTitle,
    MatDivider,
    ReactiveFormsModule
  ],
})
export class DialogClientContactComponent {
  private readonly fb = inject(FormBuilder);
  contactForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogClientContactComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.contactForm = this.fb.nonNullable.group({
      fullname: [this.data.fullname || '', [Validators.required]],
      email: [this.data.email || '', [Validators.required, Validators.email]],
      tele: [this.data.tele || ''],
    });
  }

  get fullname() {
    return this.contactForm.get('fullname');
  }

  get email() {
    return this.contactForm.get('email');
  }

  close() {
    if (this.contactForm.valid) {
      this.dialogRef.close(this.contactForm.value);
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
