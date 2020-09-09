import express, { Express, Request, Response } from 'express';
import path from 'path';
import axios from 'axios';
import bodyParser from 'body-parser';

// const viewsDirPath = path.join(__dirname, "templates", "views");
const app: Express = express()
  .use(bodyParser.urlencoded({ extended: false }))
  .set("view engine", "ejs")
  // .set("views", viewsDirPath)
  .use(express.static(path.join(__dirname, '..',"/public")));

app.get('/', (req: Request, res: Response) => {
  // index refers to index.ejs
  res.render("index");
});

app.post("/login", (req: Request, res: Response) => {
  const { name, password } = req.body;  
  if (name === "admin" && password === "admin") {
    res.render("success", {
      // passing as an object in second argument to the render method so it will be available inside that template
      username: name,
    });
  } else {
    res.render("failure");
  }
});

app.get("/repos", async (req: Request, res: Response) => {
  const username = req.query.username || "koakh";
  try {
    const result = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = result.data.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
    }));
    res.render("repos", {
      repos
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while getting list of repositories");
  }
});

app.listen(3000, () => {
  console.log('server started on port http://localhost:3000');
});
