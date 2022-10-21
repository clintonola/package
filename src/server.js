let express = require('express')
let app = express()
const postgres = require('postgres')

const sql = postgres('postgresql://localhost:3000/clintonolayiwola', {
  username: 'clintonolayiwola',
  password: 'password',
})

app.use(express.static('public'))

function addWeblink(name, url) {
  const addLink = sql`
       INSERT INTO public.links (name, user_id, url) VALUES (${name},1, ${url})
   `
  addLink.execute()
}
app.get('/addWeblink', function (req, res) {
  console.log(req.query)
  addWeblink(req.query.name, req.query.url)
  //   res.send('add')
})

function deleteWeblink(id) {
  const deleteLink = sql`
       DELETE FROM links WHERE id = ${id}
   `
  deleteLink.execute()
}
app.get('/deleteWeblink', function (req, res) {
  console.log(req.query)
  deleteWeblink(req.query.id)
  res.send('delete')
})

async function getWeblinks() {
  const getLinks = sql`
       SELECT * FROM links
   `
  return getLinks
}
app.get('/getWeblinks', async function (req, res) {
  res.send(await getWeblinks())
})

let server = app.listen(5000, function () {
  let host = server.address().address
  let port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})
