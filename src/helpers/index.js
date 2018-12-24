import React from 'react';
import { defaultRountines, defaultWorkouts } from '../constants';

// TODO need to handle A/B day type workouts
// Check if today is a workout "day"
// Check previous workout done, if none, pick A,

export const getWorkoutFromRoutine = (currentRoutineName, dayOfWeek) => {
  if (currentRoutineName) {
    const routineObject = getRoutineList()[currentRoutineName];

    if (currentRoutineName !== undefined && routineObject !== undefined) {
      // if periodizaion is weekly based
      return getWorkoutFromDay(routineObject, dayOfWeek);
      // if it is split based, getWorkoutFromSplit
      // if advanced getWorkoutFromAdvanced
    }
    return undefined;
  }
  return undefined;
};

export const getWorkoutFromDay = (routineObject, dayOfWeek) => {
  const routineForDay = routineObject[dayOfWeek];
  if (routineForDay !== undefined) {
    return getWorkoutByName(routineForDay.workout);
  }
  return undefined; // undefined will cause "nothing scheduled for today" to be displayed
};

export const getWorkoutByName = name => {
  // TODO get workouts from local storage
  // Todo way later, hit database of saved workouts
  const workout = defaultWorkouts[name];
  if (workout === undefined) {
    // todo do some error handling
    // some sort of error, saying workout was deleted, ask to re-add
  }
  return workout;
};

export const getCurrentRoutineName = () => window.localStorage.getItem('routine');

export const parseWorkoutToString = workout => {
  const formattedDay = [];

  const workOutForDay = workout;
  workOutForDay.forEach(exercise => {
    const { movement, sets, reps } = exercise;
    formattedDay.push(`${movement} - ${sets} x ${reps}`);
  });

  return formattedDay;
};

export const getRoutineStringByName = routineName => {
  const routines = getRoutineList();
  return routines[routineName];
};

export const parseRoutineByName = routineName =>
  parseRoutineToString(getRoutineStringByName(routineName));

export const parseRoutineToString = routine => {
  if (routine) {
    const result = [];

    Object.keys(routine).forEach(key => {
      const workDay = routine[key];
      // if current day has work in it, format for viewing
      if (workDay.workout !== undefined) {
        const workoutObj = getWorkoutByName(workDay.workout);
        result.push(parseWorkoutToString(workoutObj));
      }
    });
    return result;
  }
  return undefined;
};

export const getRoutineList = () => {
  // get routines from local storage
  const routines = defaultRountines; //  {...defaultRountines, ...localRoutines}
  return routines;
};

// return a default jsx object for logging the current day
// need to be able to add sets/excercises ect...
export const createLoggingForm = workout => {
  if (workout) {
    const result = [];
    workout.forEach(exercise => {
      result.push(
        <div>
          <span> {exercise.movement}: </span>
          <input type="sets" defaultValue={exercise.sets} />
          <span> x </span>
          <input type="reps" defaultValue={exercise.reps} />
        </div>
      );
    });

    return <div>{result}</div>;
  }
  return undefined;
};
