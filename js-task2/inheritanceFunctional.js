"use strict"

function starcraftRace(name, specialAbility) {
  this._name = name;
  this._specialAbility = specialAbility;
  this._isPlayedRightNow = false;

  var self = this;

  this.startPlayingThisRace = function() {
    self._isPlayedRightNow = true;
  }

  this.stopPlayingThisRace = function() {
    self._isPlayedRightNow = false;
  }
}

function starcraftTerranRace(name ,specialAbility) {
  starcraftRace.apply(this, arguments);

  var parentStartPlayingThisRace = this.startPlayingThisRace;
  this.startPlayingThisRace = function() {
    parentStartPlayingThisRace();
    alert("startPlayingThisRace was modified")
  }
}

alert("Terran race");
var terranUnit = new starcraftTerranRace("Terran", "Nuking");
terranUnit.startPlayingThisRace();
alert("My race called " + terranUnit._name + "\nMy special ability is " + terranUnit._specialAbility);
terranUnit.stopPlayingThisRace();