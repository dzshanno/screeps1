var CreateBuilder ={
    run: function() {

        var newName = 'Builder' + Game.time;
        console.log('Spawning new Builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE, MOVE], newName, 
            {memory: {role: 'building',building: 'False'}});
    }
}

module.exports = CreateBuilder;

