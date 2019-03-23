

matcherModel = {

  size: 4,
  cards: [],
  cardValues: [ "A", "B", "C", "D", "E", "F", "G", "H" ],
  totalCards:0,
  currentId: 1,

  selectedCard: null,

  numGuesses: 0, 
  matchedCards: 0,
  gameStateText: "You haven't won yet, pick two cards.",

  init: function( size ) {
    
    this.size = size || this.size;
    var numPairs = Math.pow( this.size, 2 ) / 2;
    for( var i = 0; i < numPairs ; i++ ) this.addPair();
    this.shuffle();
  },

  addPair: function(  ) {
    var value = this.cardValues[ Math.floor(Math.random() * this.cardValues.length) ];
    this.cards.push( new this.Card( this.getId(), value ));
    this.cards.push( new this.Card( this.getId(), value ));
    this.totalCards +=2;
  },
    
  getId: function(  ) {
    var id = this.currentId;
    this.currentId++;
    return id;
  },
  
  Card: function( id, value ) {
    this.id = id;
    this.value = value;
  },

  shuffle: function(  ) {
    var currentIndex = this.cards.length, rand, temp;

    while(currentIndex > 0){
      rand = Math.floor( Math.random() * currentIndex );
      currentIndex--;

      temp = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[rand];
      this.cards[rand] = temp;
    }
  },

  selectedSameCard: function( id ) {
    return this.selectedCard && this.selectedCard.id === id;
  },
    
  getCard: function( id ) {
    for( var i = 0; i < this.cards.length ; i++ ) {
      if( this.cards[i].id === id ) return this.cards[i];
    }
      
  },

  setSelectedCard(id){
    this.selectedCard = this.getCard(id);    
  },

  checkGuess: function( id ) {
    this.numGuesses += 2;
    var isCorrect = false;
    var guessedCard = this.getCard(id);

    if( guessedCard && this.selectedCard && 
          this.selectedCard.value === guessedCard.value ){
      isCorrect = true;
      this.matchedCards += 2;
    }

    this.selectedCard = null;

    if( this.matchedCards === this.totalCards )
      this.gameStateText = "Congratulations, you win!";

    return isCorrect;

  },
    

    
}
