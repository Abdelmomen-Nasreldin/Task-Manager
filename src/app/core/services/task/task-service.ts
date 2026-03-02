import { inject, Injectable, signal } from '@angular/core';
import { Task, TasksResponse } from '../../../shared/models/task.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

}
