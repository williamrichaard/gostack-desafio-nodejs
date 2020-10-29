const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200)
    .json(repositories)
});

app.post("/repositories", (request, response) => {
  let repository = { id, title, url, techs, likes } = request.body
  repository.id = uuid()
  repository.likes = 0

  repositories.push(repository)

  return response.status(200)
    .json(repository)

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const index = repositories.findIndex(obj => obj.id == id)

  if (index < 0) {
    return response.status(400)
      .json({ mensage: "Repository not found" })
  }

  const repository = { id, title, url, techs, likes: repositories[index].likes }

  repositories[index] = repository

  return response.status(202)
    .json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(obj => obj.id == id)

  if (index < 0) {
    return response.status(400)
      .json({ mensage: "Repository not found" })
  }

  repositories.splice(index, 1)

  return response.status(204)
    .send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(obj => obj.id == id)

  if (index < 0) {
    return response.status(400)
      .json({ mensage: "Repository not found" })
  }

  let repository = repositories[index]
  repository.likes = repository.likes + 1;
  repositories[index] = repository

  return response.status(200)
    .json(repository)
});

module.exports = app;