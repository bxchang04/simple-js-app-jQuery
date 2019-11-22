//this is 1.9 WIP. For all other assignments, please use the the appropriatley named js file.

// Wraps repository within IIFE
var pokemonRepository = (function () {
 var repository = [];
 // Creates variable for index 'ul' with pokemonList class
 var $pokemonList = $('ul');
 var $modalContainer = $('#modal-container');
 var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) { //only accepts pokemon
    repository.push(pokemon);
  }

  function addListItem(pokemon) { //only accpets pokemon
    var $listItem = $('<li></li>');
    var $button = $('<button="pokemon-list__button">pokemon.name</button>');
    $listItem.append($button);
    $pokemonList.append($listItem);
    $button.on('click', function() {
      showDetails(pokemon);
    })
  }

  // Show details of each Pokemon
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
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
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Function to show modal for Pokemon data
  var $modalContainer = $('#modal-container');
  var dialogPromiseReject; // This can be set later, by showDialog

  function showModal(title, text) {
    // Clear all existing modal content
    $modalContainer.innerHTML = '';

    var modal = $('<div class="modal"></div>');

    // Add the new modal content
    var closeButtonElement = $('<button class="modal-close">Close</button>');
    closeButtonElement.on('click', hideModal);

    var titleElement = $('<h1>title</h1>');

    var contentElement = $('<p>title</p>');

    modal.append(closeButtonElement);
    modal.append(titleElement);
    modal.append(contentElement);
    $modalContainer.append(modal);

    $modalContainer.addClass('is-visible');
  }

  function hideModal() {
    $modalContainer.removeClass('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseRejct = null;
    }
  }

  $('#show-modal').on('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

//First up your functions in jquery should follow this format $('input').on('click', function (event) { some action }); You seem to be trying $('input').on('click', function (event) => { some action });

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
