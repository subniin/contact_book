var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var promise = mongoose.connect('mongodb://localhost/contact_book_db', {
    useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected successfully');
});


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride("_method"));

//routes
app.use("/", require("./routes/home"));
app.use("/contacts", require("./routes/contacts"));

 //port setting
var port = 3000;
app.listen(port, function() {
  console.log("server on" + port);
});
