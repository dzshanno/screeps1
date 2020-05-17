var CreateHarvester ={
    run: function() {

        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE, MOVE], newName, 
            {memory: {role: 'harvesting'}});
    }
}

module.exports = CreateHarvester;


