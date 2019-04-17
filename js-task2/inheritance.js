"use strict"

function starcraftRace(name = "Zerg", specialAbility = "Evolution") {
  this._name = name;
  this._specialAbility = specialAbility;
  this._isPlayedRightNow = false;

  var self = this;

  this.describeRace = function() {
    alert("My race called " + this._name + "\nOur special ability is " + this._specialAbility);
  }

  this.startPlayingThisRace = function() {
    self._isPlayedRightNow = true;
  }
}

starcraftRace.prototype.greetingProtos = function() {
  alert("If you're seeing this then my code doesnt work")
}
starcraftRace.prototype.greetingZerg = function() {
  alert("If you're seeing this then my code doesnt work")
}


function starcraftTerranRace(name ,specialAbility) {
  starcraftRace.apply(this, arguments);

  var parentStartPlayingThisRace = this.startPlayingThisRace;
  this.startPlayingThisRace = function() {
    parentStartPlayingThisRace();
    this.startPlayingTerranRace();
  }

  this.startPlayingTerranRace = function() {
    alert("Currently playing as terran")
  }

}

alert("Terran race");
var terranUnit = new starcraftTerranRace("Terran", "Nuking");
terranUnit.describeRace();
terranUnit.startPlayingThisRace();

function starcraftProtosRace(name, specialAbility) {
  starcraftRace.apply(this, arguments);
}

starcraftProtosRace.prototype = Object.create(starcraftRace.prototype);
starcraftProtosRace.prototype.constructor = starcraftProtosRace;
starcraftProtosRace.prototype.greetingProtos = function() {
  alert("En taro my friend, I am " + this._name);
}

alert("Protos race");
var protosUnit = new starcraftProtosRace("Protos", "Teleporting");
protosUnit.greetingProtos();
protosUnit.describeRace();

class starcraftZergRace extends starcraftRace {
    constructor(name, specialAbility) {
        super(name, specialAbility);
    }

    greetingZerg() {
        alert("We are the Swarm. Numberless...merciless")
    }
}

alert("Zerg race");
var zergUnit = new starcraftZergRace("Zerg", "Evolution");
zergUnit.greetingZerg();
zergUnit.describeRace();
