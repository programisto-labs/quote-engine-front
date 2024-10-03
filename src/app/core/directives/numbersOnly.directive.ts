import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: 'input[numbersOnly]',
  standalone: true,
})
export class NumbersOnlyDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'Enter', 'Escape', 'Delete'];

    if (allowedKeys.indexOf(event.key) !== -1) {
      return; // Permitir teclas especiales
    }

    if ((event.key < '0' || event.key > '9') && event.key !== ' ') {
      event.preventDefault();
    }
  }
}
