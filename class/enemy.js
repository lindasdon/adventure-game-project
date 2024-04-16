const {Character} = require('./character');

class Enemy extends Character {
  constructor(name, description, currentRoom, cooldown = 3000) {
    super(name, description, currentRoom);
		this.cooldown = cooldown;
		this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
		const dirs = Object.keys(this.currentRoom.exits);
		const dir = dirs[Math.floor(Math.random() * dirs.length)];
		this.currentRoom = this.currentRoom.exits[dir];
		this.cooldown = 3000;
  }

  takeSandwich() {
  	for (let i = 0; i < this.currentRoom.items.length; i++) {
  		if(this.currentRoom.items[i].name === 'sandwich') {
  			this.items.push(this.currentRoom.items[i]);
  			this.currentRoom.items.splice(i, 1);
    	}
    }
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    this.attackTarget.applyDamage(10);
		this.cooldown = 3000;
  }

  applyDamage(amount) {
    super.applyDamage(amount);
    this.target(this.player);
  }

  target(player) {
    this.attackTarget = player;
		if(this.cooldown === 0) {
  	  this.attack();
  	}
	}
	
  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
