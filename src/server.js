var express = require('express');
var app = express();
const postgres = require('postgres');

const sql = postgres('postgresql://localhost:5432/me', {
    username: 'postgres',
    password: 'password',
})


app.use(express.static('public'));

function addWeblink(name, url) {
   const addLink = sql`
       INSERT INTO clint.link (name, url) VALUES (${name}, ${url})
   `;
   addLink.execute();
}
app.get('/addWeblink', function (req, res) {
   console.log(req.query);
   addWeblink(req.query.name, req.query.url);
   res.send('add');
})

function deleteWeblink(id) {
   const deleteLink = sql`
       DELETE FROM clint.link WHERE id = ${id}
   `;
   deleteLink.execute();
}
app.get('/deleteWeblink', function (req, res) {
   console.log(req.query);
   deleteWeblink(req.query.id);
   res.send('delete');
})

async function getWeblinks() {
   const getLinks = sql`
       SELECT * FROM clint.link
   `;
   return getLinks;
}
app.get('/getWeblinks', async function (req, res) {
   res.send(await getWeblinks());
})

var server = app.listen(5000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})