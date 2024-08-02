import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPhoneNumber]',
  standalone: true,
})
export class PhoneNumberDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(): void {
    const input = this.el.nativeElement;
    const trimmed = input.value.replace(/\D+/g, '');

    if (trimmed.length > 10) {
      input.value = input.value.slice(0, 10);
    }

    let numbers = [];
    numbers.push('+');
    numbers.push(trimmed.substring(0, 1));
    if (trimmed.length > 1) {
      numbers.push(' (' + trimmed.substring(1, 4));
    }
    if (trimmed.length >= 4) {
      numbers.push(') ' + trimmed.substring(4, 7));
    }
    if (trimmed.length >= 7) {
      numbers.push('-' + trimmed.substring(7, 9));
    }
    if (trimmed.length >= 9) {
      numbers.push('-' + trimmed.substring(9, 11));
    }
    input.value = numbers.join('');
  }
}
