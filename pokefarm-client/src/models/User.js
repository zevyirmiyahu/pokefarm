class User {
constructor(accountId, username, pokemons) {
    this.accountId = accountId;
    this.username = username;
    this.pokemons = pokemons;
  }

  get accountId() {
    return this.accountId;
  }

  get username() {
    return this.username;
  }

  get pokemons() {
    return this.pokemons;
  }

  set accountId(id) {
    this.accountId = id;
  }

  set username(name) {
    this.username(name);
  }

  set pokemons(pokemons) {
    this.pokemons = pokemons;
  }
}
