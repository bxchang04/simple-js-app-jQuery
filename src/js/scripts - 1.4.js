alert('Hello world');

var favoriteFood = "Philly Cheesesteak";
document.write(favoriteFood);

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

for(var i = 0; i < repository.length; i++){
    if(repository[i].height > 1.5){
        document.write("<p>" + repository[i].name + "(" + repository[i].height + ") - Wow, that's big!" + "</p>");
    }
    else {
        document.write("<p>" + repository[i].name + "(" + repository[i].height + ")" + "</p>");
    }
}

repository.forEach(function(pokemon) { //note to self - forEach takes var on left of forEach and uses that as the parameter in the function. Parameter name can be anything -- in this case its pokemon. This is called a nameless function, and its more succinct than declaring a loopBackFunction in the alternate way.
  console.log(repository[pokemon]);
});

/*code block above didn't work, so I experimented with another format.
Also I found this prompt to be too vague:

Part 2: forEach Loops

Use a forEach function to loop over the Pokémon in your repository array
 in order to print the details of each one.
 question: what should the format be? Is the code below sufficient? Again, prompt sounds vague. 

*/

repository.forEach(function(repo) {
  if (repo.height > 1.5) {
    document.write(
      "<p>" +
        repo.name +
        "(" +
        repo.height +
        "- Wow, that's big!) " +
        repo.types +
        "</p>"
    );
  } else {
    document.write(
      "<p>" + repo.name + "(" + repo.height + ") " + repo.types + "</p>"
    );
  }
});
