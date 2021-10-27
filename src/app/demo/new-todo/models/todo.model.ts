export interface Todo {
  id: number,
  name: string,
  isDone: boolean,
  photo?: any,
  subTodos?: Todo[]
}