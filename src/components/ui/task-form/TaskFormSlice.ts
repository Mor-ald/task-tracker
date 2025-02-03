import { createSlice } from '@reduxjs/toolkit';

import { Task } from '@/types/Tasks';

const initialStateTask: Omit<Task, 'id' | 'status'> = {
  title: '',
  description: '',
  type: 'task',
  priority: 'low',
  created: '',
  deadline: '',
  tags: [],
};

const initialStateTag: { name: string; color: string } = { name: '', color: '#000000' };

export const taskFromSlice = createSlice({
  name: 'taskForm',
  initialState: {
    task: initialStateTask,
    currentTagToAdd: initialStateTag,
  },
  reducers: {
    onSetTask: (state, action) => {
      state.task = {
        ...action.payload,
        deadline: action.payload.deadline.split('-').reverse().join(''),
      };
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
