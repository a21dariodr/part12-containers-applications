import { render, screen } from '@testing-library/react'
import Todo from "../src/Todos/Todo"

test('Todo gets rendered', () => {
    const todo = {
      text: 'Test todo',
      done: false
    }
  
    render(
      <Todo todo={todo} onClickComplete={todo => console.log(todo)} onClickDelete={todo => console.log(todo)}/>
    )
  
    expect(screen.getByText('Test todo')).toBeDefined()
  })