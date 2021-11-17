var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var path = require("path");
const bodyParser = require("body-parser");
var users = [
    {nick:"111", email:"111@w.pl"},
    {nick:"222", email:"222@w.pl"},
    {nick:"333", email:"333@w.pl"}
];

app.use(express.static('static'));

app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/removeUserBySelect", function (req, res) {
    let form = '<form action="/handleFormDelete" method="GET"><select id="user_for_delete" name="email">';
    for(var i = 0; i < users.length; i++)
    {
        form += '<option value="'+i+'">'+users[i].email+'</option>';
    }
    form +='</select> <input type="submit" value="Usuń"> </form>';
    res.send(form);
});

app.get("/removeUserByRadio", function (req, res) {
    let form = '<form action="/handleFormDelete" method="GET">';
    for(var i = 0; i < users.length; i++)
    {
        form += '<input type="radio" value="'+i+'" name="email">'+users[i].email+'</input><br>';
    }
    form +='<input type="submit" value="Usuń"> </form>';
    res.send(form);
});

app.get("/removeUserByCheckbox", function (req, res) {
    let form = '<form action="/handleFormDelete" method="GET">';
    for(var i = 0; i < users.length; i++)
    {
        form += '<input type="checkbox" value="'+i+'" name="email">'+users[i].email+'</input><br>';
    }
    form +='<input type="submit" value="Usuń"> </form>';
    res.send(form);
});

app.get("/handleFormDelete", function(req, res){
    for(let i = 0; i < req.query.email.length; i++)
    {
        delete users[req.query.email[i]];
        //console.log(req.body.email[i]);
    }
    let pom_tab = Array();
    for(var i = 0; i < users.length; i++)
    {
        if(users[i] != undefined)
        {
            pom_tab.push(users[i]);
        }
    }
    users = pom_tab;
    res.sendFile(path.join(__dirname + "/static/addUser.html")); 
});

app.post("/handleForm", function(req, res){
    //var query = {nick: req.body.nick, email: req.body.email};\
    var is_there = 0;
    //console.log(users);
    for(var i = 0; i < users.length; i++)
    {
        if(users[i].email == req.body.email)
        {
            is_there = 1;
        }
    }
    if(is_there == 0)
    {
        users.push(req.body);
    }
    else
    {
        res.send("Ten email jest już zajęty"); 
    }
});

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT );
});