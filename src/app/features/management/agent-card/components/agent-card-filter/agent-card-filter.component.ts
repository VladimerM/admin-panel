import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-agent-card-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './agent-card-filter.component.html',
  styleUrl: './agent-card-filter.component.scss',
})
export class AgentCardFilterComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  matcher = new MyErrorStateMatcher();
  @Output() onFilter = new EventEmitter();
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl(),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ),
      ]),
      phone: new FormControl(),
      role: new FormControl(),
      createDate: new FormControl(),
      modifyDate: new FormControl(),
      status: new FormControl(),
    });
  }

  filterData() {
    this.onFilter.emit(this.formGroup.getRawValue);
  }

  get login() {
    return this.formGroup.get('login');
  }

  get email() {
    return this.formGroup.get('email');
  }

  get phone() {
    return this.formGroup.get('phone');
  }

  get role() {
    return this.formGroup.get('role');
  }

  get createDate() {
    return this.formGroup.get('createDate');
  }

  get modifyDate() {
    return this.formGroup.get('modifyDate');
  }

  get status() {
    return this.formGroup.get('status');
  }
}
