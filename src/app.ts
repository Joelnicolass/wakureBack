// imports
import dotenv from "dotenv";
import Server from "./server/server";

dotenv.config();

// create server
const server = new Server();
server.listen();
