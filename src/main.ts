import express from "express";
import type { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

async function start(): Promise<void> {
  app.listen(1000, (): void => {
    console.log(`=> App listening on port 1000`);
  });
}

start();
