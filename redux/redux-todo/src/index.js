import deepFreeze from 'deep-freeze';
import expect from 'expect';

// Reducer (Handles individual todo)
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
}

// Reducer (Handles all todos)
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
    return state;
  }
}

// Test for adding a new todo
const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Testing Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Testing Redux',
      completed: false
    }
  ];

  // Freeze state to prevent mutation
  deepFreeze(stateBefore);
  deepFreeze(action);

  // Test case
  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Testing Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Learn Redux',
      completed: false
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Testing Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Learn Redux',
      completed: true
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

testAddTodo();
testToggleTodo();

console.log('All tests passed.');