import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubTodoInterface {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoInterface {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  subTodos: SubTodoInterface[];
}

interface TodoState {
  todos: TodoInterface[];
}

const loadState = (): TodoInterface[] => {
  try {
    const serializedState = localStorage.getItem('todos');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch {
    return [];
  }
};

const saveState = (state: TodoInterface[]) => {
  try {
    localStorage.setItem('todos', JSON.stringify(state));
  } catch {}
};

const initialState: TodoState = {
  todos: loadState(),
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoInterface>) => {
      state.todos.push(action.payload);
      saveState(state.todos);
    },
    editTodo: (state, action: PayloadAction<{ id: string; title: string; date: string }>) => {
      const todo = state.todos.find(t => t.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.date = action.payload.date;
        saveState(state.todos);
      }
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveState(state.todos);
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
      saveState(state.todos);
    },
    addSubTodo: (state, action: PayloadAction<{ todoId: string; subTodo: SubTodoInterface }>) => {
      const todo = state.todos.find(t => t.id === action.payload.todoId);
      if (todo) {
        todo.subTodos.push(action.payload.subTodo);
        saveState(state.todos);
      }
    },
    toggleSubTodo: (state, action: PayloadAction<{ todoId: string; subTodoId: string }>) => {
      const todo = state.todos.find(t => t.id === action.payload.todoId);
      const sub = todo?.subTodos.find(s => s.id === action.payload.subTodoId);
      if (sub) {
        sub.completed = !sub.completed;
        saveState(state.todos);
      }
    },
    deleteSubTodo: (state, action: PayloadAction<{ todoId: string; subTodoId: string }>) => {
      const todo = state.todos.find(t => t.id === action.payload.todoId);
      if (todo) {
        todo.subTodos = todo.subTodos.filter(s => s.id !== action.payload.subTodoId);
        saveState(state.todos);
      }
    },
  },
});

export const { addTodo, editTodo, toggleTodo, deleteTodo, addSubTodo, toggleSubTodo, deleteSubTodo } = todoSlice.actions;
export default todoSlice.reducer;
