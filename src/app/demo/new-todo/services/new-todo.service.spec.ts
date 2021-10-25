import { TestBed } from '@angular/core/testing';

import { NewTodoService } from './new-todo.service';

describe('NewTodoService', () => {
  let service: NewTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
