import { formatName } from "./utils/Utils";

class PokemonObject {
  constructor(id, name, types, isWorking) {
    this.id = id;
    this.name = formatName(name);
    this.types = types;
    this.isWorking = isWorking;
  }
}

export default PokemonObject;
