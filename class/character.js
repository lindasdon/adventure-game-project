class Character {

  constructor(name, description, currentRoom, strength = 10, health = 100) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
		this.strength = strength;
		this.health = health;
		this.items = [];

  }

  applyDamage(amount) {
    this.health -= amount;
		if (this.health <= 0) {
			this.die();
		}
  }

  die() {
    this.currentRoom.items.push(...this.items);
    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};
