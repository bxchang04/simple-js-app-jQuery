// Wraps repository within IIFE
var pokemonRepository = (function () {
 var repository = [];
 // Creates variable for index 'ul' with pokemonList class
 var $pokemonList = $('ul');
 var $modalContainer = $('#modal-container');
 var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    repository.push(pokemon);
  }

  function addListItem(pokemon) {
    var $listItem = $('<li></li>');
    var $button = $('<button class="pokemon-list__button">' + pokemon.name +'</button>');
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

  // Function to show modal for Pokemon data
  function showModal(pokemon) {
    /* eslint-disable no-console */
    console.log('TCL: showModal -> pokemon', pokemon.imageUrl);
    //
    /* eslint-enable no-console */

//jQuery = write literal HTML for syntax

    $modalContainer.empty();
    var $modal = $('<div class="pokemon-modal"></div>');
    var $closeButtonElement = $('<button class="modalClose"> Close </button>').on('click', hideModal);
    pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1);
    var $nameElement = $('<h1>' + pokemon.name + '</h1>');
    var $imageElement = $('<img src=' + pokemon.imageUrl + '>');
    var $heightElement = $('<div>Height: ' + pokemon.height + '</div>');
    var $typesElement = $('<div>Type: ' + pokemon.types + '</div>');

    $modal.append($closeButtonElement);
    $modal.append($nameElement);
    $modal.append($imageElement);
    $modal.append($heightElement);
    $modal.append($typesElement);
    $modalContainer.append($modal).addClass('is-visible');
  }

  function hideModal() {
    $modalContainer.removeClass('is-visible');
  }

  //Modal escape methods
  $modalContainer.on('click', function (e) {
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

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
