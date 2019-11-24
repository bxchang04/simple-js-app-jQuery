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
    var $button = $('<button="pokemon-list__button">' + pokemon.name +'</button>'); //doesn't display properly
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
  function showModal(pokemon) {
    console.log('TCL: showModal -> pokemon', pokemon.imageUrl); //what is TCL??

    //create element for Pokemon name. Is the .html necessary? Other submissions don't include that
    var $nameElement = $('h5');
    $nameElement.html(pokemon.name);
    // $nameElement.html(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));

    var $imageElement = $('<img src="' + pokemon.imageUrl + '">')
    $('div.pokemon-img').html($imageElement)

    var $heightElement = $('div.pokemon-info');
    $heightElement.html('Height: ' + pokemon.height);
  }

/*
  //Other models to study - submissions 1, 2, 3
    //SUBMISSION 1
      //Uses  $('div').html to createElement .html

    //Function to show modal for Pokemon data
    function showModal(item) {
      console.log('TCL: showModal -> item', item.imageUrl); //what is TCL??

      //create element for Pokemon name. Is the .html necessary? Other submissions don't include that
      var $nameElement = $('h5');
      $nameElement.html(item.name.charAt(0).toUpperCase() + item.name.slice(1));
      $nameElement.html(item.name.charAt(0).toUpperCase() + item.name.slice(1));

      var $imageElement = $('<img src="' + item.imageUrl + '">')
      $('div.pokemon-img').html($imageElement)

      var $heightElement = $('div.pokemon-info');
      $heightElement.html('Height: ' + item.height);
    }

    //SUBMISSION 2
      //seems the most similar to my approach
    function showModal(mortuusObj) {
      // 1
      $('#modal-container')
        .empty() //what's this for?
        .append('<div class="modal"></div>');
      //2
      $('.modal') //createElement
          .append('<button class="modal-close">close</button>')
          .append('<h3 class="modal-title"></h3>')
          .append('<img class="modal-img">')
          .append('<p class="modal-birth"></p>')
          .append('<p class="modal-death"></p>')
          .append('<p class="modal-species"></p>');
      //3
      $('.modal-close').click(function() {hideModal();});
      $('.modal-title').text(mortuusObj.name);
      $('.modal-img').attr('src', mortuusObj.imageUrl);
      //4
      $('.modal-birth').text(getBirthText(mortuusObj));
      $('.modal-death').text(getDeathText(mortuusObj));
      $('.modal-species').text(getSpeciesText(mortuusObj));
      //5
      $('#modal-container').addClass('is-visible');
    }
    //modal EventListeners:
    $('#modal-container').click(function() {hideModal();});
    $(document).keydown(function (e) {
      if (e.key === "Escape") {
        hideModal();
      }
    })

    //SUBMISSION
      //the most concise. Stringing? Removes need to use .append???
    function showModal(item) {
      $('#pokeName').text(item.name);
      $('#pokeImg').attr('src', item.imageUrl);
      $('#pokeHeight').text('Height: ' + item.height);
      $('#pokeWeight').text('Weight: ' + item.weight);
    }
  //Other models, end.
*/

  function hideModal() {
    $modalContainer.removeClass('is-visible');
  }

  $('#show-modal').on('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

  /*
  Jason:
  First up your functions in jquery should follow this format $('input').on('click', function (event) { some action }); You seem to be trying $('input').on('click', function (event) => { some action });
  */

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
