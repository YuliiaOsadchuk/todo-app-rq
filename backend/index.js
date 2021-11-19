const jsonServer = require("json-server");
const server = jsonServer.create();
const _ = require("lodash");
const router = jsonServer.router("../db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/todos", (req, res) => {
  const db = router.db;

  if (Array.isArray(req.body)) {
    req.body.forEach((element) => {
      insert(db, "todos", element);
    });
  } else {
    insert(db, "todos", req.body);
  }
  res.send(200, db.get("todos"));

  function insert(db, collection, data) {
    const table = db.get(collection);
    if (_.isEmpty(table.find(data).value())) {
      table.push(data).write();
    }
  }
});

server.use(router);
server.listen(port);
