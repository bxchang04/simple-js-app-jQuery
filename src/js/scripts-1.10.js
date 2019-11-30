// Wraps repository within IIFE
var pokemonRepository = (function () {
 var repository = [];
 // Creates variable for index with pokemonList class
 var $pokemonList = $('.pokemon-list')
 var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    repository.push(pokemon);
  }

  //Bootstrap vers
  function addListItem(pokemon){
    var listItem = $('<button type="button" class="pokemon-list_item list-group-item list-group-item-action" data-toggle="modal" data-target="#pokemon-modal"></button>');
    listItem.text(pokemon.name);
    $pokemonList.append(listItem);
    listItem.click(function() {
      showDetails(pokemon)
    });
  }

  // Show details of each Pokemon
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

 // Function to load Pokemon list from API
  function loadList() {
    return $.ajax(apiUrl, { dataType: 'json' }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      /* eslint-disable no-console */
      console.error(e);
      /* eslint-enable no-console */

    })
  }

 // Load details of each Pokemon that is clicked
  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url, { dataType: 'json' }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;

      if (details.types.length == 2 ) {
      item.types = [details.types[0].type.name, details.types[1].type.name];
      } else {
        item.types = [details.types[0].type.name];
      }
    }).catch(function (e) {
      /* eslint-disable no-console */
      console.error(e);
      /* eslint-enable no-console */
    });
  }

// creates Bootstrap Modal
  function showModal(pokemon) {
    var modal = $('.modal-body');
    pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1);
    var name = $('.modal-title').text(pokemon.name);
    var height = $('<p class="pokemon-height"></p>').text('Height: ' + pokemon.height + ' Decimetres.');
    var weight = $('<p class="pokemon-weight"></p>').text('Weight: ' + pokemon.weight + ' Hectograms.');
    var type = $('<p class="pokemon-type"></p>').text('Type: ' + pokemon.types + '.');
    var image = $('<img class="pokemon-picture">');
    image.attr('src', pokemon.imageUrl);

    if(modal.children().length) {
      modal.children().remove();
    }

    modal.append(image)
      .append(name)
      .append(height)
      .append(weight)
      .append(type);
  }

  function getAll() {
    return repository;
  }

 return {
   add: add,
   getAll: getAll,
   addListItem: addListItem,
   showDetails: showDetails,
   loadList: loadList,
   loadDetails: loadDetails,
   showModal: showModal,
 };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
