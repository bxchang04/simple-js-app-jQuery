//to-do - manually style buttons and grid layout w/ flex

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

    function add(pokemon) { //only accepts pokemon
      repository.push(pokemon);
    }

    function addListItem(pokemon) { //only accpets pokemon
      var $listItem = document.createElement('li');
      var $button = document.createElement('button');
      $button.innerText = pokemon.name;
      $button.classList.add('pokemon-list__button') //changed from pokemon-name
      $listItem.appendChild($button);
      $pokemonList.appendChild($listItem);
      $button.addEventListener('click', function() { //!!!why does this work event without a parameter in the function? - answered by Jason in submission history
        showDetails(pokemon);
      })
    }

    function showDetails(pokemon) { //only accepts pokemon
      console.log(pokemon);
    }

    function getAll() {
      return repository;
    }

    return {
      add: add,
      addListItem: addListItem,
      getAll: getAll
      //showDetails: showDetails
    };
  })();

var $pokemonList = document.querySelector('ul');
pokemonRepository.getAll().forEach(function(pokemon) { //pokemon is placeholder name for each element in repo
  pokemonRepository.addListItem(pokemon); 
});
