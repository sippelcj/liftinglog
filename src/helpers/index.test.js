import moment from 'moment';
import {
  getCurrentRoutineName,
  getRoutineList,
  parseRoutineByName,
  getWorkoutByName,
  getWorkoutFromRoutine,
  getLog,
  createLoggingStructure,
  addSetToExcercise
} from './index';
import { defaultRountines, defaultWorkouts } from '../constants';
// going to test using default routines

describe('getCurrentRoutineName', () => {
  test('should return nothing without local storage', () => {
    const result = getCurrentRoutineName('wontexist');

    expect(result).toEqual(null);
  });
});

describe('getWorkoutFromRoutine', () => {
  test('should return undefined if undefined is passed in for the workout name', () => {
    const result = getWorkoutFromRoutine(undefined, 'Tuesday');
    const expected = undefined;
    expect(result).toEqual(expected);
  });

  test('should return undefined if day does not exist', () => {
    const result = getWorkoutFromRoutine('CanditoUpperLowerSplit', 'NotADay');
    const expected = undefined;
    expect(result).toEqual(expected);
  });

  test('should create a string array of a workout for tuesday', () => {
    const result = getWorkoutFromRoutine('CanditoUpperLowerSplit', 'Tuesday');
    const expected = defaultWorkouts.LowerStrength;
    expect(result).toEqual(expected);
  });

  test('should create a string array of a workout for saturday', () => {
    const result = getWorkoutFromRoutine('CanditoUpperLowerSplit', 'Saturday');
    const expected = defaultWorkouts.ArmDay;
    expect(result).toEqual(expected);
  });

  test('should return undefined if not workout exists', () => {
    const result = getWorkoutFromRoutine('CanditoUpperLowerSplit', 'Sunday');
    expect(result).toEqual(undefined);
  });
});

// test to string function
// test('should create a string array of a workout', () => {
//   const result = getWorkoutFromRoutine('CanditoUpperLowerSplit', 'Tuesday');
//   const expected = ['Barbell Squat - 3 x 6', 'DeadLift - 3 x 6'];
//   expect(result).toEqual(expected);
// });

// test('should create a string array of a workout', () => {
//   const result = getWorkoutFromRoutine('CanditoUpperLowerSplit', 'Saturday');
//   const expected = ['Close Grip Bench - 3 x 8', 'Bicep Curl - 3 x 8'];
//   expect(result).toEqual(expected);
// });

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

describe('parseRoutineByName', () => {
  test('should return parsed routine', () => {
    const result = parseRoutineByName('StartingStrength');
    const expected = [
      ['Barbell Squat - 3 x 5', 'Barbell Bench - 3 x 5', 'DeadLift - 3 x 5'],
      ['Barbell Squat - 3 x 5', 'Barbell Overhead Press - 3 x 5', 'RDL - 3 x 5']
    ];
    expect(result).toEqual(expected);
  });
});

describe('getLog', () => {
  // todo mock moment?
  const today = moment();

  test('should create and return log if exists', () => {
    window.localStorage.setItem(today.format('YYYY-MM-DD'), 'testLog');

    const result = getLog(today);

    expect(result).toEqual('testLog');
    window.localStorage.clear();
  });
});

describe('createLoggingStructure', () => {
  test('should create data structure suitable for creating a form', () => {
    const workout = {
      name: 'Dummy Workout',
      workSets: [
        {
          movement: 'Barbell Squat',
          reps: 5,
          sets: 2
        },
        {
          movement: 'Barbell Bench',
          reps: 5,
          sets: 1
        }
      ]
    };

    const result = createLoggingStructure(workout);
    const expected = {
      'Barbell Bench': [
        {
          checked: false,
          reps: 5,
          weight: ''
        }
      ],
      'Barbell Squat': [
        {
          checked: false,
          reps: 5,
          weight: ''
        },
        {
          checked: false,
          reps: 5,
          weight: ''
        }
      ]
    };

    expect(result).toEqual(expected);
  });
});

describe('createLoggingStructure', () => {
  test('should create data structure suitable for creating a form', () => {
    const loggingStructure = {
      'Barbell Bench': [
        {
          checked: false,
          reps: 5,
          weight: ''
        }
      ],
      'Barbell Squat': [
        {
          checked: false,
          reps: 5,
          weight: ''
        },
        {
          checked: false,
          reps: 5,
          weight: ''
        }
      ]
    };

    const expected = [
      {
        checked: false,
        reps: 5,
        weight: ''
      },
      {
        checked: false,
        reps: 5,
        weight: ''
      }
    ];

    const result = addSetToExcercise({}, loggingStructure, 'Barbell Bench');

    expect(result['Barbell Bench']).toEqual(expected);
  });
});

// describe('createLoggingForm', () => {
//   test('should do', () => {
//     const workout = defaultWorkouts.StartingStrengthA;

//     const result = createLoggingForm(workout);
//     const expected = {};

//     expect(result).toEqual(expected);
//   });
// });
