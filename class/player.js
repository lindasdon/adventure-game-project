const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
		const items = this.currentRoom.items;
		for (let i = 0; i < items.length; i++) {
			if(items[i].name === itemName) {
				this.items.push(items[i]);
				items.splice(i,1);
			}
		}
  }

  dropItem(itemName) {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].name === itemName) {
				this.currentRoom.items.push(this.items[i]);
				this.items.splice(i, 1);
			}
		}
  }

  eatItem(itemName) {
    for (let i = 0; i < this.items.length; i++) {
    	if((this.items[i].name === itemName) &&
    	this.items[i].isFood) {
    		this.items.splice(i, 1);
    		return true;
    	}
		}
  }

  getItemByName(name) {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].name === name) {
				return this.items[i];
			}
		}
		for (let j = 0; j < this.currentRoom.items.length; j++) {
			if (this.currentRoom.items[j].name === name) {
				this.items.push(this.currentRoom.items[j]);
				this.currentRoom.items.splice(j, 1);
				return this.items[this.items.length - 1];
			}
		}
		return undefined;
  }

  hit(name) {
		const enemies = this.currentRoom.getEnemies();
		for(let e = 0; e < enemies.length; e++) {
			if(enemies[e].name === name) {
				enemies[e].applyDamage(10);
			}
		}
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
