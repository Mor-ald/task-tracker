import createDate from './createDate';

import { test, expect } from '@jest/globals';

describe('CreateDate function', () => {
  test('Create date with single digit', () => {
    const newDate = new Date(2025, 0, 5);

    expect(createDate(newDate)).toBe('05-01-2025');
  });

  test('Create date with single digit for day and double digit for month', () => {
    const newDate = new Date(2025, 10, 5);

    expect(createDate(newDate)).toBe('05-11-2025');
  });

  test('Create date with single digit for month and double digit for day', () => {
    const newDate = new Date(2025, 2, 15);

    expect(createDate(newDate)).toBe('15-03-2025');
  });
});
