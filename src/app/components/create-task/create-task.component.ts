import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { Task } from 'src/app/types/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  form = this.formBuilder.group({
    taskName: '',
    dueDate: '',
  })

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    const task: Task = {
      taskName: this.form.get('taskName')?.value || '',
      dueDate: this.form.get('dueDate')?.value || '',
    }

    this.taskService.addTask(task)
    this.taskService.saveToLocalStorage(task)
    this.resetForm()
  }

  resetForm(): void {
    this.form.reset()
  }
}
