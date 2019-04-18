"use strict"

function starcraftRace(name, specialAbility) {
  this._name = name;
  this._specialAbility = specialAbility;
  this._isPlayedRightNow = false;

  starcraftRace.prototype.greetingMessageZerg = "Hello";
}

class starcraftZergRace extends starcraftRace {
    constructor(name, specialAbility) {
        super(name, specialAbility);
    }

    greetingMessageZerg = "We are the Swarm. Numberless...merciless (Parent prototype was modified)"
}

alert("Zerg race");
var zergUnit = new starcraftZergRace("Zerg", "Evolution");
alert(zergUnit.greetingMessageZerg + "\nMy race called " + zergUnit._name + "\nMy special ability is " + zergUnit._specialAbility);
