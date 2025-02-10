import taskFormReducer, {
  onSetMode,
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
  TaskFormStore,
} from './TaskFormSlice';

const initialState: TaskFormStore = {
  mode: 'add',
  task: {
    id: 0,
    title: '',
    description: '',
    type: 'task',
    status: 'to-do',
    priority: 'low',
    created: '',
    deadline: '',
    tags: [],
  },
  currentTagToAdd: { name: '', color: '#000000' },
};

describe('TaskFormSlice', () => {
  it('Should return the initial state', () => {
    const result = taskFormReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  it('Should setMode', () => {
    const action = { type: onSetMode.type, payload: { mode: 'edit' } };
    const result = taskFormReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      mode: 'edit',
    });
  });

  it('Should setTask', () => {
    const data = {
      id: 1234,
      title: 'New title',
      description: 'New desc',
      type: 'feature',
      status: 'in-progress',
      priority: 'medium',
      created: '',
      deadline: '2025-02-10',
      tags: [],
    };

    const action = {
      type: onSetTask.type,
      payload: data,
    };
    const result = taskFormReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      task: data,
    });
  });

  it('Should clearTask', () => {
    const action = {
      type: onClearTask.type,
    };
    const result = taskFormReducer(undefined, action);

    expect(result).toEqual(initialState);
  });

  it('Should change title', () => {
    const action = {
      type: onChangeTitle.type,
      payload: { title: 'New title' },
    };
    const result = taskFormReducer(initialState, action);

    expect(result).toEqual({ ...initialState, task: { ...initialState.task, title: 'New title' } });
  });

  it('Should change description', () => {
    const action = {
      type: onChangeDescription.type,
      payload: { description: 'New desc' },
    };
    const result = taskFormReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      task: { ...initialState.task, description: 'New desc' },
    });
  });

  it('Should change type', () => {
    const action = {
      type: onChangeType.type,
      payload: { type: 'refactor' },
    };
    const result = taskFormReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      task: { ...initialState.task, type: 'refactor' },
    });
  });

  it('Should change priority', () => {
    const action = {
      type: onChangePriority.type,
      payload: { priority: 'medium' },
    };
    const result = taskFormReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      task: { ...initialState.task, priority: 'medium' },
    });
  });

  it('Should change deadline', () => {
    const action = {
      type: onChangeDeadLine.type,
      payload: { deadline: '2025-02-10' },
    };
    const result = taskFormReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      task: { ...initialState.task, deadline: '2025-02-10' },
    });
  });

  it('Should add new tag', () => {
    const action = {
      type: onAddNewTag.type,
      payload: { name: 'Tag', color: '#333333' },
    };
    const result = taskFormReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      task: {
        ...initialState.task,
        tags: [...initialState.task.tags, { name: 'Tag', color: '#333333' }],
      },
    });
  });

  it('Should remove tag', () => {
    const action = {
      type: onRemoveTag.type,
      payload: { name: 'New Tag' },
    };
    const result = taskFormReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      task: {
        ...initialState.task,
        tags: initialState.task.tags.filter((tag) => tag.name !== 'New Tag'),
      },
    });
  });

  it('Should change tag name', () => {
    const action = {
      type: onChangeTagName.type,
      payload: { name: 'Tag' },
    };
    const result = taskFormReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      currentTagToAdd: { name: 'Tag', color: '#000000' },
    });
  });

  it('Should pick tag color', () => {
    const action = {
      type: onPickTagColor.type,
      payload: { color: '#333333' },
    };
    const result = taskFormReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      currentTagToAdd: { name: '', color: '#333333' },
    });
  });
});
