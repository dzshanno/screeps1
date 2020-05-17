const numberofbuilders =6;
const numberofharvesters = 3;
const numberofupgraders = 0;
const numberofrestorers =0;




var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var CreateHarvester = require('create.harvester');
var CreateBuilder = require('create.builder');
var roleRestorer = require('role.restorer');

module.exports.loop = function () {

    console.log(Game.spawns['Spawn1'].room.controller.level);

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    

   

    

    var restorers = _.filter(Game.creeps, (creep) => creep.memory.role == 'restoring');
    console.log('restorers: ' + restorers.length);

    if(restorers.length < numberofrestorers) {
        var newName = 'restorer' + Game.time;
        console.log('Spawning new restorer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE, MOVE], newName, 
            {memory: {role: 'restoring'}});
    }

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'building');
    console.log('builders: ' + builders.length);

    if(builders.length < numberofbuilders) {
       CreateBuilder.run();
    }

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrading');
    console.log('upgraders: ' + upgraders.length);

    if(upgraders.length < numberofupgraders) {
        var newName = 'upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE, MOVE], newName, 
            {memory: {role: 'upgrading'}});
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesting');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < numberofharvesters) {
        CreateHarvester.run();
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvesting') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrading') {
            roleUpgrader.run(creep);
            
        }
        if(creep.memory.role == 'building') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'restoring') {
            roleRestorer.run(creep);
        }
    }
}