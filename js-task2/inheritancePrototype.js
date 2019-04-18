"use strict"

function starcraftRace(name, specialAbility) {
  this._name = name;
  this._specialAbility = specialAbility;

  starcraftRace.prototype.greetingMessageProtos = "Hello";
}

function starcraftProtosRace(name, specialAbility) {
  starcraftRace.apply(this, arguments);
}

starcraftProtosRace.prototype = Object.create(starcraftRace.prototype);
starcraftProtosRace.prototype.constructor = starcraftProtosRace;
starcraftProtosRace.prototype.greetingMessageProtos = "En Taro My Friend (Parent prototype was modified)";

alert("Protos race");
var protosUnit = new starcraftProtosRace("Protos", "Teleporting");
alert(protosUnit.greetingMessageProtos + "\nMy race called " + protosUnit._name + "\nMy special ability is " + protosUnit._specialAbility);