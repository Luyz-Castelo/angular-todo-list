import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Task } from 'src/app/types/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  form = this.formBuilder.group({
    taskName: ['', Validators.required],
    dueDate: ['', Validators.required],
    isComplete: [false],
  })

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const task: Task = {
      id: crypto.randomUUID(),
      taskName: this.form.get('taskName')?.value || '',
      dueDate: this.form.get('dueDate')?.value || '',
      isComplete: this.form.get('isComplete')?.value || false,
    }

    const storageKey = task.isComplete ? 'completeTasks' : 'incompleteTasks'

    this.taskService.addTask(task, storageKey)
    this.resetForm()
  }

  resetForm(): void {
    this.form.reset()
  }
}
