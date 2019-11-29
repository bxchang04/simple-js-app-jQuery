// Wraps repository within IIFE
var pokemonRepository = (function () {
 var repository = [];
 // Creates variable for index 'ul' with pokemonList class
 var $pokemonList = $('ul');
 var $modalContainer = $('#modal-container'); //querySelector
 var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) { //only accepts pokemon
    repository.push(pokemon);
  }

  function addListItem(pokemon) { //only accpets pokemon
    var $listItem = $('<li></li>');
    var $button = $('<button class="pokemon-list__button">' + pokemon.name +'</button>'); //syntax error corrected
    $listItem.append($button);
    $pokemonList.append($listItem);
    $button.on('click', function() {
      showDetails(pokemon);
    })
  }

  // Function to show details of each Pokemon
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
      console.error(e);
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
       console.error(e);
     });
   }

  // Function to show modal for Pokemon data
  function showModal(pokemon) {
    console.log('TCL: showModal -> pokemon', pokemon.imageUrl); //what is TCL??
    //
//jQuery = write literal HTML for syntax

    $modalContainer.empty();
    var $modal = $('<div class="pokemon-modal"></div>'); //can't name it modal otherwise jQuery has a conflict -- class needs double quotes -- snake case
    var $closeButtonElement = $('<button class="modalClose"> Close </button>').on('click', hideModal);
    pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1);
    var $nameElement = $('<h1>' + pokemon.name + '</h1>');
    var $imageElement = $('<img src=' + pokemon.imageUrl + '>');
    var $heightElement = $('<div>Height: ' + pokemon.height + '</div>');
    var $weightElement = $('<div>Height: ' + pokemon.weight + '</div>');
    var $typesElement = $('<div>Type: ' + pokemon.types + '</div>');

    $modal.append($closeButtonElement);
    $modal.append($nameElement);
    $modal.append($imageElement);
    $modal.append($heightElement);
    $modal.append($weightElement);
    $modal.append($typesElement);
    $modalContainer.append($modal).addClass('is-visible');
  }

  function hideModal() {
    $modalContainer.removeClass('is-visible');
  }

  //*Jason:
  // First up your functions in jquery should follow this format $('input').on('click', function (event) { some action }); You seem to be trying $('input').on('click', function (event) => { some action });
  // */

  //Modal escape methods
  $modalContainer.on('click', function (e) { // $modalContainer.on('click', function (e) =>
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });

  //Existing code from 1.8
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
   hideModal: hideModal
 };
})();

var $pokemonList = $('ul');
pokemonRepository.getAll().forEach(function(pokemon) { //pokemon is placeholder name for each element in repo
  pokemonRepository.addListItem(pokemon); //what happens if parameter is blank, will it work?
});

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
