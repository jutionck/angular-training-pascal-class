export interface Todo {
  id: number,
  name: string,
  isDone: boolean,
  subTodo?: Todo[]
}