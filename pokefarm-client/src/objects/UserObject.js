class UserObject {
  constructor(accountId, username, money, pokemons) {
    this.accountId = accountId;
    this.username = username;
    this.money = money;
    this.pokemons = pokemons;
  }

  get accountId() {
    return this.accountId;
  }

  get username() {
    return this.username;
  }

  get money() {
    return this.money;
  }

  get pokemons() {
    return this.pokemons;
  }

  set accountId(accountId) {
    this.accountId = accountId;
  }

  set username(username) {
    this.username = username;
  }

  set money(money) {
    this.money = money;
  }

  set pokemons(pokemons) {
    this.pokemons = pokemons;
  }
}

export default UserObject;
