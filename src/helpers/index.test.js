import { getRoutineList, parseRoutine, getWorkoutByName, getWorkoutByDay } from './index';
import { defaultRountines, defaultWorkouts } from '../constants';
// going to test using default routines

describe('parseWorkoutToString', () => {
  test('should create a string array of a workout', () => {
    const result = getWorkoutByDay('CanditoUpperLowerSplit', 'Tuesday');
    const expected = ['Barbell Squat - 3 x 6', 'DeadLift - 3 x 6'];
    expect(result).toEqual(expected);
  });
});

describe('getRoutineList', () => {
  test('should return default routines when no local storage exists', () => {
    const result = getRoutineList();

    expect(result).toEqual(defaultRountines);
  });
});

describe('getWorkoutByName', () => {
  test('should return workout from default workouts', () => {
    const result = getWorkoutByName('StartingStrengthA');

    expect(result).toEqual(defaultWorkouts.StartingStrengthA);
  });
});

describe('parseRoutine', () => {
  test('should return default routines when no local storage exists', () => {
    const result = parseRoutine(defaultRountines.StartingStrength);
    const expected = [
      ['Barbell Squat - 3 x 5', 'Barbell Bench - 3 x 5', 'DeadLift - 3 x 5'],
      ['Barbell Squat - 3 x 5', 'Barbell Overhead Press - 3 x 5', 'RDL - 3 x 5']
    ];
    expect(result).toEqual(expected);
  });
});
