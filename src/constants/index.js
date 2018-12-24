export const defaultExercises = {
  CloseGripPushUp: {
    name: 'CloseGripPushUp'
    // type = reps (use bodyweight as volume calculator)
  },
  BarbellSquat: {
    name: 'BarbellSquat'
    // type = sets and reps
  },
  BarbellBenchPress: {
    name: 'BarbellBenchPress'
  },
  BarbellOverheadPress: {
    name: 'BarbellOverheadPress'
  },
  DeadLift: {
    name: 'DeadLift'
  },
  SumoDeadlift: {
    name: 'SumoDeadlift'
  },
  BarbellRow: {
    name: 'BarbellRow'
  },
  BarbellBicepCurl: {
    name: 'BarbellBicepCurl'
  },
  FrontSquat: {
    name: 'FrontSquat'
  },
  DumbellBenchPress: {
    name: 'DumbellBenchPress'
  },
  DumbellRow: {
    name: 'DumbellRow'
  },
  InclineDumbellBenchPress: {
    name: 'InclineDumbellBenchPress'
  },
  ChinUp: {
    name: 'ChinUp'
  },
  Pullup: {
    name: 'Pullup'
  },
  CableRow: {
    name: 'CableRow'
  },
  DumbellBicepCurl: {
    name: 'DumbellBicepCurl'
  },
  EZBarCurl: {
    name: 'EZBarCurl'
  },
  RDL: {
    name: 'RDL'
  },
  StraightLegDeadLift: {
    name: 'StraightLegDeadLift'
  }
};

export const defaultWorkouts = {
  LowerStrength: {
    name: 'Lower Strength',
    workSets: [
      {
        // This needs to map to an actual excercise
        movement: 'Barbell Squat',
        reps: 6,
        sets: 3
      },
      {
        movement: 'DeadLift',
        reps: 6,
        sets: 3
      }
    ]
  },
  UpperStrength: {
    name: 'Upper Strength',
    workSets: [
      {
        movement: 'Barbell Bench Press',
        reps: 6,
        sets: 3
      },
      {
        movement: 'Barbell Row',
        reps: 6,
        sets: 3
      }
    ]
  },
  UpperVolume: {
    name: 'Upper Volume',
    workSets: [
      {
        movement: 'Dumbell Bench Press',
        reps: 8,
        sets: 4
      },
      {
        movement: 'Dumbell Row',
        reps: 8,
        sets: 4
      }
    ]
  },
  LowerVolume: {
    name: 'Lower Volume',
    workSets: [
      {
        movement: 'Front Squat',
        reps: 8,
        sets: 5
      },
      {
        movement: 'Paused DeadLift',
        reps: 8,
        sets: 3
      }
    ]
  },
  ArmDay: {
    name: 'Arm Day',
    workSets: [
      {
        movement: 'Close Grip Bench',
        reps: 8,
        sets: 3
      },
      {
        movement: 'Bicep Curl',
        reps: 8,
        sets: 3
      }
    ]
  },
  StartingStrengthA: {
    name: 'Starting Strength A',
    workSets: [
      {
        movement: 'Barbell Squat',
        reps: 5,
        sets: 3
      },
      {
        movement: 'Barbell Bench',
        reps: 5,
        sets: 3
      },
      {
        movement: 'DeadLift',
        reps: 5,
        sets: 3
      }
    ]
  },
  StartingStrengthB: {
    name: 'Starting Strength B',
    workSets: [
      {
        movement: 'Barbell Squat',
        reps: 5,
        sets: 3
      },
      {
        movement: 'Barbell Overhead Press',
        reps: 5,
        sets: 3
      },
      {
        movement: 'RDL',
        reps: 5,
        sets: 3
      }
    ]
  }
};

export const defaultRountines = {
  CanditoUpperLowerSplit: {
    periodization: 'weekly',
    Monday: {
      workout: 'UpperStrength'
    },
    Tuesday: {
      workout: 'LowerStrength'
    },
    Wednesday: {},
    Thursday: {
      workout: 'UpperVolume'
    },
    Friday: {
      workout: 'LowerVolume'
    },
    Saturday: {
      workout: 'ArmDay'
    },
    Sunday: {}
  },
  StartingStrength: {
    periodization: 'CustomSplit',
    workDays: ['Monday', 'Wednesday', 'Friday'],
    workouts: ['A', 'B'],
    // Need to store what previous workday was
    A: {
      workout: 'StartingStrengthA'
      // optional accesory work
    },
    B: {
      workout: 'StartingStrengthB'
      // optional accesory work
    }
  },
  CanditoAdvancedProgram: {
    periodization: 'advanced', // Anything more than a single week is advanced
    Week1: {
      Monday: {}
    }
  }
  // TODO add cardio day?
};
