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

    let numbers: any = [];
    numbers.push('+');
    numbers.push(trimmed.substring(0, 1));
    if (trimmed.length > 1) {
      numbers.push('(' + trimmed.substring(1, 4));
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
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const input = this.el.nativeElement;
    const { selectionStart, selectionEnd, value } = input;

    if (event.key === 'Backspace' && selectionStart === selectionEnd) {
      const caretPosition = selectionStart;

      if (caretPosition > 0) {
        let newValue =
          value.substring(0, caretPosition - 1).replace(/\D+/g, '') +
          value.substring(caretPosition).replace(/\D+/g, '');
        newValue = newValue.substring(0, newValue.length);

        let numbers: any = [];
        numbers.push(newValue.substring(0, 1));
        if (newValue.length > 1) {
          numbers.push('(' + newValue.substring(1, 4));
        }
        if (newValue.length >= 4) {
          numbers.push(') ' + newValue.substring(4, 7));
        }
        if (newValue.length >= 7) {
          numbers.push('-' + newValue.substring(7, 9));
        }
        if (newValue.length >= 9) {
          numbers.push('-' + newValue.substring(9, 11));
        }
        numbers.length > 1 ? numbers.unshift('+') : undefined;

        input.value = numbers.join('');

        input.setSelectionRange(caretPosition - 1, caretPosition - 1);
        event.preventDefault();
      }
    }
  }
}
