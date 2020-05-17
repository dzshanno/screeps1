var roleRestorer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });
        
        targets.sort((a,b) => a.hits - b.hits);

        if(creep.memory.restoring && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.restoring = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.restoring && creep.store.getFreeCapacity() == 0) {
	        creep.memory.restoring = true;
	        creep.say('⚡ restore');
	    }



        if(creep.memory.restoring) {
            if(targets.length > 0) {
                
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0],{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }

            else {
                var targets2 = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                });
                if(targets2.length > 0) {
                    if(creep.transfer(targets2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets2[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }

        else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
            } 
        
    }

};

module.exports = roleRestorer;
