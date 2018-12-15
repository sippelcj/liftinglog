const plateChoices = [
    45,
    35,
    25,
    10,
    5,
    2.5,
];

const calculatePlates = (weight, barWeight) => {
    const result = [];

    const orderedPlates = plateChoices;
    const done = false;
    while(done){
        const maxPlate = getMaxPlate(weight);
        const remainder = weight - maxPlate;
    }
}

const getMaxPlate = (weight) => {
    const done = false;
    while(done){
        const index = 0;
        const plate = plateChoices[index];
        if(weight - plate < 0){
            index = index + 1;
        } else {
            return index;
        }
    }
}