import React from 'react';
import { cloneDeep } from 'lodash';
import { IconContext } from 'react-icons';
import { FaPlusCircle } from 'react-icons/fa';
import { Container, Row, Col } from 'react-grid-system';
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

export const getWorkoutFromSplit = (routineObject, dayOfWeek) => {
  // Get the type of split
  // Monday Wednesday Friday A/B Split
  // Monday Wednesday Friday A/B/C/D Split
  // Make it work for any day of week and any number of days
  //
  // get next day of the week in program
  // see if previous day of weeks workout was completed, need to store previously completed workout?
  //
  // Otherwise get first day of program
  //
  // check storage for previous workout
  const routineForDay = routineObject[dayOfWeek];
  if (routineForDay !== undefined) {
    return getWorkoutByName(routineForDay.workout);
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
  workOutForDay.workSets.forEach(exercise => {
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

export const createLoggingStructure = workout => {
  const result = {};
  workout.workSets.forEach(exercise => {
    const sets = [];
    // Container, Row, Col
    let setNum = 0;
    for (setNum; setNum < exercise.sets; setNum++) {
      sets.push({
        weight: '', // default should be previous entry
        reps: exercise.reps,
        checked: false
      });
    }
    result[exercise.movement] = sets;
  });

  return result;
};

// CAREFUL this mutuates, in this case this is desired since we want to change
// the object which is currently rendered
export const addSetToExcercise = (component, loggingStructure, movement) => {
  const arrayOfSets = loggingStructure[movement];
  // get latest set and copy it
  const setCopy = cloneDeep(arrayOfSets[arrayOfSets.length - 1]);
  arrayOfSets.push(setCopy);

  component.setState({ loggingData: loggingStructure });

  return loggingStructure;
};

export const updateInput = (e, comp, loggingStructure, index, exerciseName) => {
  const thing = loggingStructure[exerciseName][index];

  thing.weight = e.target.value;

  comp.setState({
    loggingStructure
  });
};

// return a default jsx object for logging the current day
// need to be able to add sets/excercises ect...
export const createLoggingForm = (comp, day, loggingStructure, addSetFunc) => {
  if (loggingStructure) {
    const result = [];
    Object.keys(loggingStructure).forEach(exerciseName => {
      // Container, Row, Col
      result.push(
        <Row>
          <Col xs={12} sm={12}>
            {exerciseName}
          </Col>
        </Row>
      );
      loggingStructure[exerciseName].forEach((setObj, index) => {
        result.push(
          <Row>
            <Col xs={1} sm={1}>
              {index}
            </Col>
            <Col xs={4} sm={4}>
              Prev
            </Col>
            <Col xs={4} sm={4}>
              <input
                type="text"
                className="weight-input"
                placeholder="weight"
                defaultValue={setObj.weight}
                onChange={e => {
                  updateInput(e, comp, loggingStructure, index, exerciseName);
                }}
              />
            </Col>
            <Col xs={1} sm={1}>
              x
            </Col>
            <Col xs={1} sm={1}>
              <input type="text" className="rep-input" defaultValue={setObj.reps} />
            </Col>
            <Col xs={1} sm={1}>
              <input
                onClick={() => {
                  logSet(day, index, exerciseName, setObj.weight, setObj.reps);
                }}
                type="checkbox"
                className="rep-input"
              />
            </Col>
          </Row>
        );
      });
      // if more data -
      result.push(
        <div>
          <Row>
            <Col xs={1} sm={1} offset={{ xs: 11, sm: 11 }}>
              <button
                className="add-button"
                type="button"
                onClick={() => addSetFunc(comp, loggingStructure, exerciseName)}
              >
                <IconContext.Provider value={{ size: '2em' }}>
                  <div>
                    <FaPlusCircle />
                  </div>
                </IconContext.Provider>
              </button>
            </Col>
          </Row>
          <Row>
            <hr />
          </Row>
        </div>
      );
    });

    return <Container>{result}</Container>;
  }
  return undefined;
};

// Get log
// if one does not exist create on with default values
export const getLog = day => {
  // Logs are stored by day
  const logKey = day.format('YYYY-MM-DD');
  const localLog = window.localStorage.getItem(logKey);
  // If does not exist, create one from the current selected routine
  if (localLog) {
    return localLog;
  }
  return undefined;
};

// create log from todays plans
export const createLogForWorkout = workout => {
  const result = {
    name: workout.name,
    sets: {}
  };

  return result;
};

// create log from todays plans
export const logSet = (day, index, name, weight, reps) => {
  const logKey = day.format('YYYY-MM-DD');
  const localLog = JSON.parse(window.localStorage.getItem(logKey));

  let setsForThisMovement = localLog.sets[name];
  if (setsForThisMovement === undefined) {
    setsForThisMovement = [];
  }

  const set = {
    index,
    weight,
    reps
  };
  // Check to see if set already exists with this index
  if (
    setsForThisMovement.findIndex(setFromStorage => {
      return index === setFromStorage.index;
    }) > -1
  ) {
    setsForThisMovement[index] = set;
  } else {
    setsForThisMovement.push(set);
  }

  localLog.sets[name] = setsForThisMovement;

  window.localStorage.setItem(logKey, JSON.stringify(localLog));

  return localLog;
};

// Add method for removing set from log

// And removing sets from the view
