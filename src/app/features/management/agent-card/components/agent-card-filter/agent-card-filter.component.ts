import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
import { CommonModule, DatePipe, KeyValue } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PhoneNumberDirective } from '../../directives/phone-number.directive';
import { AgentAction, AgentStatus } from '../../enums/agent-card.enum';

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
    PhoneNumberDirective,
  ],
  providers: [DatePipe],
  templateUrl: './agent-card-filter.component.html',
  styleUrl: './agent-card-filter.component.scss',
})
export class AgentCardFilterComponent implements OnInit {
  @Output() onFilter = new EventEmitter();
  @Output() onAction = new EventEmitter<AgentAction>();
  formGroup: FormGroup = new FormGroup({});
  matcher = new MyErrorStateMatcher();
  roleDropdown: KeyValue<boolean, string>[] = [
    { key: true, value: 'Администратор' },
    { key: false, value: 'Пользователь' },
  ];

  statusDropdown: KeyValue<string, string>[] = [
    { key: AgentStatus.ACTIVE, value: 'Активен' },
    { key: AgentStatus.BLOCKed, value: 'Заблокирован' },
  ];

  AgentAction = AgentAction;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl(null, [
        Validators.pattern('^[a-zA-Z][a-zA-Z0-9_]{2,15}$'),
      ]),
      email: new FormControl(null, [
        Validators.email,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ),
      ]),
      phone: new FormControl(null, [
        Validators.pattern('/+d(d{3}) d{3}-d{2}-d{2}/'),
      ]),
      is_admin: new FormControl(),
      create_at: new FormControl(),
      update_at: new FormControl(),
      status: new FormControl(),
    });
  }

  filterData() {
    let filter = this.formGroup.getRawValue();
    console.log(filter.create_at);

    if (filter.create_at)
      filter.create_at = new Date(filter.create_at).getTime();
    if (filter.update_at)
      filter.update_at = new Date(filter.update_at).getTime();
    this.onFilter.emit(filter);
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
    return this.formGroup.get('is_admin');
  }

  get createDate() {
    return this.formGroup.get('create_at');
  }

  get modifyDate() {
    return this.formGroup.get('update_at');
  }

  get status() {
    return this.formGroup.get('status');
  }
}
