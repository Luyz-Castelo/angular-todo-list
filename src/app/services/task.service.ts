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

  addTask(task: Task, storageKey: string): void {
    this.taskSource.next(task)
    this.saveToLocalStorage(task, storageKey)
  }

  saveToLocalStorage(task: Task, storageKey: string): void {
    const existingTasks = localStorage.getItem(storageKey)
    if(!existingTasks) {
      localStorage.setItem(storageKey, JSON.stringify([task]))
      return
    }
    const tasksToSave = [...JSON.parse(existingTasks), task]
    localStorage.setItem(storageKey, JSON.stringify(tasksToSave))
  }

  updateLocalStorage(completeTasks: Task[], incompleteTasks: Task[]):void {
    localStorage.setItem('completeTasks', JSON.stringify(completeTasks))
    localStorage.setItem('incompleteTasks', JSON.stringify(incompleteTasks))
  }

  getFromLocalStorage(key: string): Task[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  changeTaskStatus(task: Task) {
    const existingCompleteTasks = localStorage.getItem('completeTasks') || '[]'
    const existingIncompleteTasks = localStorage.getItem('incompleteTasks') || '[]'

    let newCompleteTasks: Task[] = []
    let newIncompleteTasks: Task[] = []

    if(task.isComplete) {
      task.isComplete = !task.isComplete
      newCompleteTasks = JSON.parse(existingCompleteTasks).filter((t: Task) => t.id !== task.id)
      newIncompleteTasks = [...JSON.parse(existingIncompleteTasks), task]
    } else {
      task.isComplete = !task.isComplete
      newCompleteTasks = [...JSON.parse(existingCompleteTasks), task]
      newIncompleteTasks = JSON.parse(existingIncompleteTasks).filter((t: Task) => t.id !== task.id)
    }

    this.updateLocalStorage(newCompleteTasks, newIncompleteTasks)
  }

  deleteTask(task: Task) {
    const storageKey = task.isComplete ? 'completeTasks' : 'incompleteTasks'
    const tasksInStorage: Task[] = JSON.parse(localStorage.getItem(storageKey) || '[]')

    localStorage.setItem(storageKey, JSON.stringify(tasksInStorage.filter(t => t.id !== task.id)))
  }
}
