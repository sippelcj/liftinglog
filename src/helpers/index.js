import React from 'react';
import { defaultRountines, defaultWorkouts } from '../constants';

// TODO need to handle A/B day type workouts
export const getWorkoutByDay = (currentRoutineName, dayOfWeek) => {
  if(currentRoutineName !== undefined && getRoutine(currentRoutineName) !== undefined){
  return parseWorkoutToString(getRoutine(currentRoutineName)[dayOfWeek].workout);
  }
}

export const getWorkoutByName = (name) => {
  // TODO get workouts from local storage
  // Todo way later, hit database of saved workouts
  const workout = defaultWorkouts[name];
  if(workout === undefined){
  // todo do some error handling
  // some sort of error, saying workout was deleted, ask to re-add
  }
  return workout;
}

export const getCurrentRoutineName = () => {
  return window.localStorage.getItem('routine');
}

export const parseRoutine = (routine) => {
  let result = [];
  // loop though each day and format into object easily read into components
  Object.keys(routine).forEach((key) => {
  const workDay = routine[key];
  // if current day has work in it, format for viewing
  if(workDay.workout !== undefined){
    result.push(parseWorkoutToString(workDay.workout));
  }
  });
  return result;
}

export const parseWorkoutToString = (workoutName) => {
  const formattedDay = [];
  
  const workOutForDay = getWorkoutByName(workoutName);
  workOutForDay.forEach(exercise => {
  const {movement, sets, reps } = exercise;
  formattedDay.push(
    `${movement} - ${sets} x ${reps}`
  );
  });

  return formattedDay;
}

export const getRoutine = (routineName) => {
  const routines = getRoutineList();
  return routines[routineName];
}

export const parseRoutineByName = (routineName) => {
  return parseRoutine(getRoutine(routineName));
}

export const getRoutineList = () => {
  // get routines from local storage
  const routines = defaultRountines; //  {...defaultRountines, ...localRoutines} 
  return routines;
}

  // return a default jsx object for logging the current day
  // need to be able to add sets/excercises ect...
export const createLoggingForm = (workout) => {
  workout.array.forEach(element => {
  
  });
  
  return (
  <div>
  { /* list of excercises in the current workout */ }

  </div>
  );
}

