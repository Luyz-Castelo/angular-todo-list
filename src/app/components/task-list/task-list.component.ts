import { TaskService } from './../../services/task.service';
import { Task } from './../../types/task';
import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  completeTasks: Task[] = [];
  incompleteTasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.task.subscribe(task => {
      if(task.isComplete) this.completeTasks.push(task)
      else this.incompleteTasks.push(task);
    })
    this.getTasksFromLocalStorage()
  }

  getTasksFromLocalStorage(): void {
    this.completeTasks = this.taskService.getFromLocalStorage('completeTasks')
    this.incompleteTasks = this.taskService.getFromLocalStorage('incompleteTasks')
  }

  changeTaskStatus(task: Task): void {
    this.taskService.changeTaskStatus(task)
    this.getTasksFromLocalStorage()
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task)
    this.getTasksFromLocalStorage()
  }
}
