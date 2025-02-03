import { createSlice } from '@reduxjs/toolkit';

import { Task } from '@/types/Tasks';

const initialMode: 'add' | 'edit' | null = null;

const initialStateTask: Task = {
  id: 0,
  title: '',
  description: '',
  type: 'task',
  status: 'to-do',
  priority: 'low',
  created: '',
  deadline: '',
  tags: [],
};

const initialStateTag: { name: string; color: string } = { name: '', color: '#000000' };

export const taskFromSlice = createSlice({
  name: 'taskForm',
  initialState: {
    mode: initialMode,
    task: initialStateTask,
    currentTagToAdd: initialStateTag,
  },
  reducers: {
    onSetMode: (state, action) => {
      state.mode = action.payload.mode;
    },
    onSetTask: (state, action) => {
      state.task = action.payload;
    },
    onClearTask: (state) => {
      state.task = initialStateTask;
    },
    onChangeTitle: (state, action) => {
      console.log(action);
      state.task.title = action.payload.title;
    },
    onChangeDescription: (state, action) => {
      state.task.description = action.payload.description;
    },
    onChangeType: (state, action) => {
      console.log(action);
      state.task.type = action.payload.type;
    },
    onChangePriority: (state, action) => {
      state.task.priority = action.payload.priority;
    },
    onChangeDeadLine: (state, action) => {
      state.task.deadline = action.payload.deadline;
    },
    onAddNewTag: (state, action) => {
      state.task.tags = [...state.task.tags, action.payload];
      state.currentTagToAdd = {
        name: '',
        color: '#000000',
      };
    },
    onRemoveTag: (state, action) => {
      state.task.tags = state.task.tags.filter((tag) => tag.name !== action.payload.name);
    },
    onChangeTagName: (state, action) => {
      state.currentTagToAdd.name = action.payload.name;
    },
    onPickTagColor: (state, action) => {
      state.currentTagToAdd.color = action.payload.color;
    },
  },
});

export const {
  onSetTask,
  onClearTask,
  onChangeTitle,
  onChangeDescription,
  onChangeType,
  onChangePriority,
  onChangeDeadLine,
  onChangeTagName,
  onPickTagColor,
  onAddNewTag,
  onRemoveTag,
} = taskFromSlice.actions;

export default taskFromSlice.reducer;
