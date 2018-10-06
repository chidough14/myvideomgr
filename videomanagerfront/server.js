const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

/*
 * Initialise Pusher
 */
const Pusher = require('pusher');
const pusher = new Pusher({
  appId:'607085',
  key:'dff874c0a56ee1bb0cd2',
  secret:'50dde7a6137b2b0c8730',
  cluster:'eu'
});

/*
 * Define post route for creating new reviews
 */
app.post('/comment', (req, res) => {
  pusher.trigger('comment', 'comment_added', {comment: req.body});
  res.status(200).send();
  console.log(req.body)
});

/*
 * Run app
 */
const port = 5000;
app.listen(port, () => { console.log(`App listening on port ${port}!`)});
