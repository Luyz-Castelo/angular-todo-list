import { TaskService } from './../../services/task.service';
import { Task } from './../../types/task';
import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.task.subscribe(task => {
      this.tasks.push(task);
    })
  }

}
