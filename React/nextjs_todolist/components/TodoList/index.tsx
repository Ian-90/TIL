import { FC, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { TodoType } from '../../types/todo'
import palette from '../../styles/palette'
import TrashCanIcon from '../../public/svg/trash_can.svg'
import CheckMarkIcon from '../../public/svg/check_mark.svg'
import { checkTodoAPI, deleteTodoAPI } from '../../lib/api'


interface ITodoList {
  todos: TodoType[]
}

const Container = styled.div`
  width: 100%;

  .todo-num {
    margin-left: 12px;
  }

  .todo-list-header {
    padding: 12px;
    position: relative;
    border-bottom: 1px solid ${palette.gray};

    .todo-list-last-todo {
      font-size: 14px;
      margin: 0 0 8px;
      span {
        margin-left: 8px;
      }
    }
  }

  .todo-list-header-colors {
    display: flex;
    .todo-list-header-color-num {
      display: flex;
      margin-right: 8px;
      p {
        font-size: 14px;
        line-height: 16px;
        margin: 0;
        margin-left: 6px;
      }
      .todo-list-header-round-color {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }
    }
  }

  .bg-blue {
    background-color: ${palette.blue};
  }
  .bg-green {
    background-color: ${palette.green};
  }
  .bg-navy {
    background-color: ${palette.navy};
  }
  .bg-orange {
    background-color: ${palette.orange};
  }
  .bg-red {
    background-color: ${palette.red};
  }
  .bg-yellow {
    background-color: ${palette.yellow};
  }

  .todo-list {
    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 52px;
      border-bottom: 1px solid ${palette.gray};

      .todo-left-side {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;

        .todo-color-block {
          width: 12px;
          height: 100%;
        }
        .checked-todo-text {
          color: ${palette.gray};
          text-decoration: line-through;
        }
        .todo-text {
          margin-left: 12px;
          font-size: 16px;
        }
      }
    }
  }

  .todo-right-side {
    display: flex;
    margin-right: 12px;
    svg {
      &:first-child {
        margin-right: 16px;
      }
    }

    .todo-trash-can {
      width: 16px;
      path {
        fill: ${palette.deep_red};
      }
    }

    .todo-check-mark {
      fill: ${palette.deep_green};
    }
  
    .todo-button {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1xp solid ${palette.gray};
      background-color: transparent;
      outline: none;
    }
  }
`

const TodoList: FC<ITodoList> = ({ todos }) => {
  const [localTodos, setLocalTodos] = useState(todos)
  const getTodoColorNums = useCallback(() => {
    let red = 0
    let orange = 0
    let yellow = 0
    let green = 0
    let blue = 0
    let navy = 0
  
    localTodos.forEach((todo) => {
      switch (todo.color) {
        case "red":
          red += 1
          break
        case "orange":
          orange += 1
          break
        case "yellow":
          yellow += 1
          break
        case "green":
          green += 1
          break
        case "blue":
          blue += 1
          break
        case "navy":
          navy += 1
          break
        default:
            break
      }
    })
  
    return {
      red,
      orange,
      yellow,
      green,
      blue,
      navy,
    }
  }, [localTodos])

  type ObjectIndexType = {
    [key: string]: number | undefined
  }
  const todoColorNums = useMemo(() => {
    const colors: ObjectIndexType = {}
    localTodos.forEach((todo) => {
      const value = colors[todo.color]
      if (!value) {
        colors[`${todo.color}`] = 1
      } else {
        colors[`${todo.color}`] = value + 1
      }
    })
    return colors
  }, [localTodos])

  const checkTodo = async (id: number) => {
    try {
      await checkTodoAPI(id);
      const newTodos = localTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked }
        }
        return todo
      })
      setLocalTodos(newTodos)
      console.log("체크하였습니다.");
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoAPI(id)
      const newTodos = localTodos.filter((todo) => todo.id !== id)
      setLocalTodos(newTodos)
      console.log('삭제했습니다.')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Container>
      <div className='todo-list-header'>
        <p className='todo-list-last-todo'>
          남은 TODO<span>{todos.length}개</span>
        </p>
        <div className="todo-list-header-colors">
          {Object.keys(todoColorNums).map((color, idx) => (
            <div className='todo-list-header-color-num' key={color}>
              <div className={`todo-list-header-round-color bg-${color}`} />
              <p>{todoColorNums[color]}개</p>
            </div>
          ))}
        </div>
      </div>
      <ul className='todo-list'>
        {todos.map((todo) => (
          <li className='todo-item' key={todo.id}>
            <div className='todo-left-side'>
              <div className={`todo-color-block bg-${todo.color}`} />
              <p className={`todo-text ${todo.checked ? 'checked-todo-text': ''}`}>
                {todo.text}
              </p>
            </div>
            <div className='todo-right-side'>
              {todo.checked && (
                <>
                  <TrashCanIcon className='todo-trash-can' onClick={() => deleteTodo(todo.id)} />
                  <CheckMarkIcon className='todo-check-mark' onClick={() => checkTodo(todo.id)} />
                </>
              )}
              {!todo.checked && (
                <button
                  type='button'
                  className='todo-button'
                  onClick={() => checkTodo(todo.id)}
                >
                  
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Container>  )
}

export default TodoList
