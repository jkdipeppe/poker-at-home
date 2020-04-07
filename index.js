const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/deckOfCards', function(req, res, next) {
  var suits = ["spades", "diamonds", "clubs", "hearts"];
  var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  var deck = new Array()
  for(var i = 0; i < suits.length; i++)
    {
        for(var x = 0; x < values.length; x++)
        {
            var card = {Value: values[x], Suit: suits[i]};
            deck.push(card);
        }
    }
  res.json(deck);
  console.log(`Sent deck of cards: ${deck}`);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
