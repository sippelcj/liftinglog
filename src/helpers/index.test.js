import moment from 'moment';
import {
  getCurrentRoutineName,
  getRoutineList,
  parseRoutineByName,
  getWorkoutByName,
  getWorkoutFromRoutine,
  getLog,
  createLoggingStructure,
  addSetToExcercise,
  createLogForWorkout,
  logSet
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
    const setState = jest.fn();
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

    const result = addSetToExcercise({ setState }, loggingStructure, 'Barbell Bench');

    // expect setstate to be called
    expect(result['Barbell Bench']).toEqual(expected);
  });
});

describe('logSet', () => {
  test('should ', () => {
    const day = moment();
    const logKey = day.format('YYYY-MM-DD');
    const name = 'Some Movement';
    const weight = '300';
    const reps = 6;

    const newLog = createLogForWorkout({
      name: 'Some Workout'
    });
    window.localStorage.setItem(day.format('YYYY-MM-DD'), JSON.stringify(newLog));
    logSet(day, 0, name, weight, reps);

    const expected = {
      name: 'Some Workout',
      sets: {
        'Some Movement': [
          {
            index: 0,
            weight: '300',
            reps: 6
          }
        ]
      }
    };

    expect(JSON.parse(window.localStorage.getItem(logKey))).toEqual(expected);

    // Test adding another set to the log
    logSet(day, 1, name, weight, 5);

    expected.sets['Some Movement'].push({
      index: 1,
      weight: '300',
      reps: 5
    });

    expect(JSON.parse(window.localStorage.getItem(logKey))).toEqual(expected);

    // Test adding a set as the same position as last
    logSet(day, 1, name, '250', 8);

    expected.sets['Some Movement'][1] = {
      index: 1,
      weight: '250',
      reps: 8
    };

    expect(JSON.parse(window.localStorage.getItem(logKey))).toEqual(expected);
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
