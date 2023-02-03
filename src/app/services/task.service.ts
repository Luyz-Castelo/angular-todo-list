import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../types/task'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskSource = new Subject<Task>()
  task = this.taskSource.asObservable()

  constructor() { }

  addTask(task: Task): void {
    this.taskSource.next(task)
  }

  saveToLocalStorage(task: Task): void {
    debugger
    const existingTasks = localStorage.getItem('tasks');
    if(!existingTasks) {
      localStorage.setItem('tasks', JSON.stringify([task]))
      return
    }
    const tasksToSave = [...JSON.parse(existingTasks), task]
    localStorage.setItem('tasks', JSON.stringify(tasksToSave))
  }

  getFromLocalStorage(): string | null {
    return localStorage.getItem('tasks');
  }
}
