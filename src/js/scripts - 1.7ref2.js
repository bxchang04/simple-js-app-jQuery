// IIFE begins here!
var pokemonRepository = (function() {
    var repository = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        repository.push(pokemon);
    }

    function getAll() {
        return repository;
    }

    function addListItem(pokemon) {
        var pokemonList = $('.pokemon-list');
        var listItem = $(
            '<button type="button" class="pokemon-list__button list-group-item list-group-item-action" data-toggle="modal" data-target="#modal-item">' +
                pokemon.name +
                '</button>'
        );
        pokemonList.append(listItem);
        listItem.on('click', function() {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return $.ajax(apiUrl, { dataType: 'json' })
            .then(function(response) {
                // Return key to fetch(GET) complete pokemon list
                $.each(response.results, function(index, item) {
                    var pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon); // Add each pokemon from results to repository variable
                });
            })
            .catch(function(e) {
              /* eslint-disable no-console */
                console.error(e);
              /* eslint-enable no-console */
            });
    }

    function loadDetails(item) {
        // Expects parameter with pokemon object as parameter
        var url = item.detailsUrl;
        return $.ajax(url)
            .then(function(details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.weight = details.weight;
                item.types = details.types.map(function(pokemon) {
                    return pokemon.type.name;
                });
            })
            .catch(function(e) {
              /* eslint-disable no-console */
                console.error(e);
              /* eslint-enable no-console */
            });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function() {
            // Modal content creation
            var modalContainer = $('.modal-body');
            // NameElement
            var nameElement = $('.modal-title').text(
                item.name.charAt(0).toUpperCase() + item.name.slice(1)
            );
            // HeightElement
            var heightElement = $('<p class="pokemon-height"></p>').text(
                'Height: ' + item.height + '0 cm'
            );
            //WeightElement
            var weightElement = $('<p class="pokemon-weight"></p>').text(
                'Weight: ' + item.weight + '00 grams'
            );
            //TypeElement
            var typeElement = $('<p class="pokemon-type"></p>').text(
                'Type: ' + item.types
            );
            // ImageElement
            var imageElement = $('<img class="pokemon-img">');
            imageElement.attr('src', item.imageUrl);
            // Remove content once modal is closed
            if (modalContainer.children().length) {
                modalContainer.children().remove();
            }

            //Append all items to modalBody
            modalContainer.append(nameElement);
            modalContainer.append(heightElement);
            modalContainer.append(weightElement);
            modalContainer.append(typeElement);
            modalContainer.append(imageElement);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})(); // IIFE ends here!

pokemonRepository.loadList().then(function() {
    var pokemonAll = pokemonRepository.getAll();
    $.each(pokemonAll, function(index, pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

//Pokemon filter
$(document).ready(function() {
    $('#search-pokemon').on('keyup', function() {
        var value = $(this)
            .val()
            .toLowerCase();
        $('.pokemon-list__button').filter(function() {
            $(this).toggle(
                $(this)
                    .text()
                    .toLowerCase()
                    .indexOf(value) > -1
            );
        });
    });
});

//Use when needed
/* javascript: (function() {
var elements = document.body.getElementsByTagName('*');
var items = [];
for (var i = 0; i < elements.length; i++) {
if (elements[i].innerHTML.indexOf('* { background:#000!important;color:#0f0!important;outline:solid #f00 1px!important; background-color: rgba(255,0,0,.2) !important; }') != -1) {
items.push(elements[i]);
}
}
if (items.length > 0) {
for (var i = 0; i < items.length; i++) {
items[i].innerHTML = '';
}
} else {
document.body.innerHTML +=
'<style>* { background:#000!important;color:#0f0!important;outline:solid #f00 1px!important; background-color: rgba(255,0,0,.2) !important; }\
* * { background-color: rgba(0,255,0,.2) !important; }\
* * * { background-color: rgba(0,0,255,.2) !important; }\
* * * * { background-color: rgba(255,0,255,.2) !important; }\
* * * * * { background-color: rgba(0,255,255,.2) !important; }\
* * * * * * { background-color: rgba(255,255,0,.2) !important; }\
* * * * * * * { background-color: rgba(255,0,0,.2) !important; }\
* * * * * * * * { background-color: rgba(0,255,0,.2) !important; }\
* * * * * * * * * { background-color: rgba(0,0,255,.2) !important; }</style>';
}
})();
*/
