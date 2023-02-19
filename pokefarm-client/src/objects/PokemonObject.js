import { formatName } from "../utils/Utils";

class PokemonObject {
  constructor(id, name, types, isWorking) {
    this.uniqueId = name + Date.now(); // unique identifier used for component keys in lists
    this.id = id; // the pokemon numerical ID
    this.name = formatName(name);
    this.types = types;
    this.isWorking = isWorking;
  }
}

export default PokemonObject;
