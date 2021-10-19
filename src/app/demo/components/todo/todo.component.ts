import { Component, OnInit } from '@angular/core';
import { fail } from 'assert';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];

  ngOnInit(): void {
    // this.todos = [
    //   {
    //     id: 1,
    //     name: 'Makan',
    //     isDone: false
    //   },
    //   {
    //     id: 2,
    //     name: 'Minum',
    //     isDone: false
    //   },
    //   {
    //     id: 1,
    //     name: 'Rebahan',
    //     isDone: true
    //   },
    // ]

    /**
     * Challenge menyimpan data ke sessinStorage
     */

    const sessinStorageTodo: string = sessionStorage.getItem('todos') as string;

    if (sessinStorageTodo) {
      this.todos = JSON.parse(sessinStorageTodo);
    } else {
      this.todos = [
        {
          id: 1,
          name: 'Makan',
          isDone: false
        },
        {
          id: 2,
          name: 'Minum',
          isDone: false
        },
        {
          id: 1,
          name: 'Rebahan',
          isDone: true
        },
      ]

      sessionStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  // property
  pageTitle: string = 'Todo Component';

  // menerima dari child component
  onCheckedTodo(todo: Todo): void {
    console.log(todo);
    console.log(this.todos);

    // challenge sessionStorage
    sessionStorage.setItem('todos', JSON.stringify(this.todos))
  }

  // challenge
  onViewTodo(text: string): void {
    console.log('Todo yang dipilih:', text);
  }

  // array
  person = ['Budi', 'Tono'];

  // method
  greeting() {
    return this.pageTitle;
  }

  // object
  person2 = [
    {
      name: 'Budi',
      age: 20,
      skill: [
        {
          skillName: 'Git',
          level: 'Advanced'
        },
        {
          skillName: 'Java',
          level: 'Pro'
        }
      ]
    },
    {
      name: 'Ani',
      age: 19,
      skill: [
        {
          skillName: 'Git',
          level: 'Advanced'
        },
        {
          skillName: 'Java',
          level: 'Pro'
        }
      ]
    },
    {
      name: 'Dody',
      age: 15,
      skill: [
        {
          skillName: 'Git',
          level: 'Advanced'
        },
        {
          skillName: 'Java',
          level: 'Pro'
        }
      ]
    }
  ]

}
