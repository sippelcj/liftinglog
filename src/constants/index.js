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
  LowerStrength: [
    {
      movement: 'Barbell Squat',
      reps: 6,
      sets: 3
    },
    {
      movement: 'DeadLift',
      reps: 6,
      sets: 3
    }
  ],
  UpperStrength: [
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
  ],
  UpperVolume: [
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
  ],
  LowerVolume: [
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
  ],
  StartingStrengthA: [
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
  ],
  StartingStrengthB: [
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
};

export const defaultRountines = {
  CanditoUpperLowerSplit: {
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
    Sat: {
      // optional arm day
    },
    Sun: {}
  },
  StartingStrength: {
    A: {
      workout: 'StartingStrengthA'
      // optional accesory work
    },
    B: {
      workout: 'StartingStrengthB'
      // optional accesory work
    }
  }
};
