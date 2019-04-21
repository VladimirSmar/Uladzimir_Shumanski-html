var ROOF_TYPES = {
  GABLE : 1,
  MANSARD : 2,
  FLAT : 3
};

class Structure {
  
  constructor(builder) {
    this.roof = builder.roof;
    this.floor = builder.floor;
    this.window = builder.window;
    this.intrance = builder.intrance;
  }

}

function askForDetails() {

  this.typeOfRoof = +prompt('What type of roof would your like to build? \n Gable - 1, Mansard - 2, Flat - 3', 1);
  this.amountOfFloors = +prompt('How many floors would you like to add? \n Max amount of floors - 5', 1);
  this.amountOfWindows = +prompt('How many windows would you like to add? \n Max amount of windows per floor - 4', 1);
  this.amountOfIntrances = +prompt('How many intrances would you like to add? \n Max amount of intrances - 2', 1);

}

class StructureBuilder {

  constructor() {
    this.roof = null;
    this.floor = null;
    this.window = null;
    this.intrance = null;
  }

  buildRoof(typeOfRoof) {
    this.roof = checkTypeOfRoofValue(typeOfRoof);
    return this;
  }

  buildFloor(amountOfFloors) {
    this.floor = checkAmountOfFloorsValue(amountOfFloors);
    return this;
  }

  buildWindow(amountOfWindows) {
    this.window = checkAmountOfWindowsValue(amountOfWindows);
    return this;
  }

  buildIntrance(amountOfIntrances) {
    this.intrance = checkAmountOfIntrancesValue(amountOfIntrances);
    return this;
  }

  build() {
    var structure = new Structure(this);
    return structure;
  }

}

function checkTypeOfRoofValue(typeOfRoof) {

  if (typeOfRoof < 1 || typeOfRoof > 3) {
    console.log('Wrong type of roof, default type was used ( Flat )');
    return ROOF_TYPES.FLAT;
  } else if (typeOfRoof === 1) {
      return ROOF_TYPES.GABLE;
  } else if (typeOfRoof === 2) {
      return ROOF_TYPES.MANSARD;
  } else if (typeOfRoof === 3) {
      return ROOF_TYPES.FLAT;
  }

}

function checkAmountOfFloorsValue(amountOfFloors) {
  
  if (amountOfFloors < 1 || amountOfFloors > 5) {
    console.log("Wrong amount of floors, average amount of floors were used ( 3 )");
    return 3;
  } else {
    return amountOfFloors;
  }

}

function checkAmountOfWindowsValue(amountOfWindows) {
  
  if(amountOfWindows < 1 || amountOfWindows > 4) {
    console.log("Wrong amount of windows, average amount of windows were used ( 3 )");
    return 3;
  } else {
    return amountOfWindows;
  }

}

function checkAmountOfIntrancesValue(amountOfIntrances) {
  
  if(amountOfIntrances < 1 || amountOfIntrances > 2) {
    console.log("Wrong amount of intrances, average amount of intrances were used ( 1 )");
    return 1;
  } else {
    return amountOfIntrances;
  }

}

class SctucturingDirector {

  buildLittleStructure() {
    var littleStructure = new StructureBuilder()
        .buildRoof(1)
        .buildFloor(1)
        .buildWindow(1)
        .buildIntrance(1)
        .build();
    structureRenderer(littleStructure);
  }
  
  buildMediumStructure() {
    var mediumStructure = new StructureBuilder()
        .buildRoof(2)
        .buildFloor(3)
        .buildWindow(3)
        .buildIntrance(1)
        .build();
    structureRenderer(mediumStructure);
  }
  
  buildBigStructure() {
    var bigStructure = new StructureBuilder()
        .buildRoof(3)
        .buildFloor(5)
        .buildWindow(4)
        .buildIntrance(2)
        .build();
    structureRenderer(bigStructure);
  }

}

function structureRenderer(structure) {
  if( structure === null || structure === undefined || structure.roof === null && structure.floor === null && structure.window === null && structure.intrance === null) {
    console.log('Sorry, we are not building structures anymore, now we are building crosses \u2629\u2629\u2629');
  } else { 

    if (structure.roof === ROOF_TYPES.GABLE) {
      console.log(
        '                   \u2571\u2572                             \n' + 
        '                  \u2571\u2571\u2572\u2572                            \n' +
        '                 \u2571\u2571\u2571\u2572\u2572\u2572                           \n' +
        '                \u2571\u2571\u2571\u2571\u2572\u2572\u2572\u2572                          \n' +
        '               \u2571\u2571\u2571\u2571\u2571\u2572\u2572\u2572\u2572\u2572                         \n' +
        '              \u2571\u2571\u2571\u2571\u2571\u2571\u2572\u2572\u2572\u2572\u2572\u2572                        \n' +
        '             \u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2572\u2572\u2572\u2572\u2572\u2572\u2572                       \n' +
        '            \u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572                      \n' +
        '           \u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572                     \n' +
        '          \u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572                    \n' +
        '         \u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572                   \n' +
        '        \u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572                  \n' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\n' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\n' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\n');
    } else if (structure.roof === ROOF_TYPES.MANSARD) {
      console.log(
        '          \u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E                   \n' +
        '        \u2571\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u2572                   \n' +
        '       \u2571\u2571\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u2572\u2572                  \n' +
        '      \u2571\u2571\u2571\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u2572\u2572\u2572                 \n' +
        '     \u2571\u2571\u2571\u2571\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u2572\u2572\u2572\u2572                \n' +
        '    \u2571\u2571\u2571\u2571\u2571\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u2572\u2572\u2572\u2572\u2572               \n' +
        '   \u2571\u2571\u2571\u2571\u2571\u2571\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u2572\u2572\u2572\u2572\u2572\u2572              \n' +
        '  \u2571\u2571\u2571\u2571\u2571\u2571\u2571\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u2572\u2572\u2572\u2572\u2572\u2572\u2572             \n' +
        ' \u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572            \n' +
        '\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u2571\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u257E\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572\u2572           \n' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\n' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\n' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\n');
    } else {
      console.log(
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\n' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\n' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\n');
    }
// !                                                            !
    
    if (structure.window === 4) {
        for (var i = structure.floor; i > 0; i--) {
        console.log(
          '\u257D                                                        \u257D\n' +
          '\u257D    \u2554\u2550\u2550\u2550\u2566\u2550\u2550\u2550\u2557    \u2554\u2550\u2550\u2550\u2566\u2550\u2550\u2550\u2557    \u2554\u2550\u2550\u2550\u2566\u2550\u2550\u2550\u2557    \u2554\u2550\u2550\u2550\u2566\u2550\u2550\u2550\u2557    \u257D\n' +
          '\u257D    \u2551   \u2551   \u2551    \u2551   \u2551   \u2551    \u2551   \u2551   \u2551    \u2551   \u2551   \u2551    \u257D\n' +
          '\u257D    \u2560\u2550\u2550\u2550\u256C\u2550\u2550\u2550\u2563    \u2560\u2550\u2550\u2550\u256C\u2550\u2550\u2550\u2563    \u2560\u2550\u2550\u2550\u256C\u2550\u2550\u2550\u2563    \u2560\u2550\u2550\u2550\u256C\u2550\u2550\u2550\u2563    \u257D\n' +
          '\u257D    \u2551   \u2551   \u2551    \u2551   \u2551   \u2551    \u2551   \u2551   \u2551    \u2551   \u2551   \u2551    \u257D\n' +
          '\u257D    \u255A\u2550\u2550\u2550\u2569\u2550\u2550\u2550\u255D    \u255A\u2550\u2550\u2550\u2569\u2550\u2550\u2550\u255D    \u255A\u2550\u2550\u2550\u2569\u2550\u2550\u2550\u255D    \u255A\u2550\u2550\u2550\u2569\u2550\u2550\u2550\u255D    \u257D\n' +
          '\u257D                                                        \u257D' + i);
        }
    } else if (structure.window === 3) {
        for (var i = structure.floor; i > 0; i--) {
        console.log(
          '\u257D                                                        \u257D\n' +
          '\u257D     \u2554\u2550\u2550\u2550\u2566\u2550\u2550\u2550\u2557          \u2554\u2550\u2550\u2550\u2566\u2550\u2550\u2550\u2557         \u2554\u2550\u2550\u2550\u2566\u2550\u2550\u2550\u2557     \u257D\n' +
          '\u257D     \u2551   \u2551   \u2551          \u2551   \u2551   \u2551         \u2551   \u2551   \u2551     \u257D\n' +
          '\u257D     \u2560\u2550\u2550\u2550\u256C\u2550\u2550\u2550\u2563          \u2560\u2550\u2550\u2550\u256C\u2550\u2550\u2550\u2563         \u2560\u2550\u2550\u2550\u256C\u2550\u2550\u2550\u2563     \u257D\n' +
          '\u257D     \u2551   \u2551   \u2551          \u2551   \u2551   \u2551         \u2551   \u2551   \u2551     \u257D\n' +
          '\u257D     \u255A\u2550\u2550\u2550\u2569\u2550\u2550\u2550\u255D          \u255A\u2550\u2550\u2550\u2569\u2550\u2550\u2550\u255D         \u255A\u2550\u2550\u2550\u2569\u2550\u2550\u2550\u255D     \u257D\n' +
          '\u257D                                                        \u257D' + i);
        }
    } else if (structure.window === 2) {
        for (var i = structure.floor; i > 0; i--) {
        console.log(
          '\u257D                                                        \u257D\n' +
          '\u257D              \u2554\u2550\u2550\u2550\u2566\u2550\u2550\u2550\u2557          \u2554\u2550\u2550\u2550\u2566\u2550\u2550\u2550\u2557              \u257D\n' +
          '\u257D              \u2551   \u2551   \u2551          \u2551   \u2551   \u2551              \u257D\n' +
          '\u257D              \u2560\u2550\u2550\u2550\u256C\u2550\u2550\u2550\u2563          \u2560\u2550\u2550\u2550\u256C\u2550\u2550\u2550\u2563              \u257D\n' +
          '\u257D              \u2551   \u2551   \u2551          \u2551   \u2551   \u2551              \u257D\n' +
          '\u257D              \u255A\u2550\u2550\u2550\u2569\u2550\u2550\u2550\u255D          \u255A\u2550\u2550\u2550\u2569\u2550\u2550\u2550\u255D              \u257D\n' +
          '\u257D                                                        \u257D' + i);
        }
    } else {
        for (var i = structure.floor; i > 0; i--) {
        console.log(
          '\u257D                                                        \u257D\n' +
          '\u257D                       \u2554\u2550\u2550\u2550\u2566\u2550\u2550\u2550\u2557                        \u257D\n' +
          '\u257D                       \u2551   \u2551   \u2551                        \u257D\n' +
          '\u257D                       \u2560\u2550\u2550\u2550\u256C\u2550\u2550\u2550\u2563                        \u257D\n' +
          '\u257D                       \u2551   \u2551   \u2551                        \u257D\n' +
          '\u257D                       \u255A\u2550\u2550\u2550\u2569\u2550\u2550\u2550\u255D                        \u257D\n' +
          '\u257D                                                        \u257D' + i);
        }
    }

     if (structure.intrance === 2) {
      console.log(
        '\u258E              \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588          \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588               \u258E\n' +
        '\u258E\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u258E\n' +
        '\u258E              \u2551       \u2551          \u2551       \u2551               \u258E\n' +
        '\u258E              \u2551       \u2551          \u2551       \u2551               \u258E\n' +
        '\u258E              \u2551\u2550\u2550     \u2551          \u2551\u2550\u2550     \u2551               \u258E\n' +
        '\u258E              \u2551       \u2551          \u2551       \u2551               \u258E\n' +
        '\u258E              \u2551       \u2551          \u2551       \u2551               \u258E\n');
    } else {
      console.log(
        '\u258E                       \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588                         \u258E\n' +
        '\u258E\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588' +
        '\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557' +
        '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u258E\n' +
        '\u258E                       \u2551       \u2551                         \u258E\n' +
        '\u258E                       \u2551       \u2551                         \u258E\n' +
        '\u258E                       \u2551\u2550\u2550     \u2551                         \u258E\n' +
        '\u258E                       \u2551       \u2551                         \u258E\n' +
        '\u258E                       \u2551       \u2551                         \u258E\n');
    }  
  }

}

askForDetails();
var testStructure = new StructureBuilder()
    .buildRoof(this.typeOfRoof)
    .buildFloor(this.amountOfFloors)
    .buildWindow(this.amountOfWindows)
    .buildIntrance(this.amountOfIntrances)
    .build();
structureRenderer(testStructure);

var testDirector = new SctucturingDirector();
testDirector.buildLittleStructure();
testDirector.buildMediumStructure();
testDirector.buildBigStructure();