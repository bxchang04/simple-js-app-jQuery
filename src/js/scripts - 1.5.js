var pokemonRepository = (function (repository) {
    var repository = [
      {
      name: "Bulbasaur",
      height: 0.7,
      types: ["grass", "poison"]
      },
      {
          name: "Squirtle",
          height: 0.5,
          types: ["water"]
      },
      {
          name: "Charizard",
          height: 1.7,
          types: ["fire", "flying"]
      }
    ];

    function add(pokemon) {
      repository.push(pokemon);
    }

    function getAll() {
      return repository;
    }

    return {
      add: add,
      getAll: getAll
    };
  })();

pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height > 1.5) {
    document.write(
      "<p>" +
        pokemon.name +
        "(" +
        pokemon.height +
        "- Wow, that's big!) " +
        pokemon.types +
        "</p>"
    );
  } else {
    document.write(
      "<p>" + pokemon.name + "(" + pokemon.height + ") " + pokemon.types + "</p>"
    );
  }
});
