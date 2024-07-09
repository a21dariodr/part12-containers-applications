import Todo from "../src/Todos/Todo";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import {expect, test, screen} from '@jest/globals'

test('Todo gets rendered', () => {
    const todo = {
      text: 'Test todo',
      done: false
    }
  
    render(
      <Todo todo={todo} onClickComplete={() => console.log('Completed')} onClickDelete={() => console.log('Deleted')}/>
    )
  
    expect(screen.getByText('Test todo')).toBeDefined()
  })