import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { Task  } from '../../models/task.interface';
import { User } from '../../models/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal implements OnInit, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['updatedTask']) {
      this.form.patchValue(this.updatedTask() as Partial<Task>);
    }
  }

  ngOnInit(): void {
    console.log(this.updatedTask());
  }
  updatedTask = input<Task>();
  closeModal = output<void>();
  saveModal = output<Task>();

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    dueDate: new FormControl<Date | null>(null, [Validators.required]),
    // assignee: new FormControl<Pick<User, "id" | "name" | "email" | "avatar"> | null>(null, [Validators.required]),
  });

  onCloseModal() {
    this.closeModal.emit();
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    let task = {} as Task;
    if (this.updatedTask()) {
       task = { ...this.updatedTask(), ...this.form.value as Task };
    } else {
      task = { ...this.form.value as Task, id: uuidv4(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    }

    this.saveModal.emit(task);
  }

}
