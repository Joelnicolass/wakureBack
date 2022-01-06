import express from "express";
import userRoutes from "../routes/user_router";
import authRoutes from "../routes/auth_router";
import wakureRoutes from "../routes/wakure_router";
import cors from "cors";
import { connect } from "../db/connection";
import { tokenValidator } from "../utils/token_handler";

// class server --------------------------------------
class Server {
  private _app: express.Application;
  private _port: String;
  private _ApiPaths = {
    auth: "/api/auth",
    users: "/api/users",
    wakure: "/api/wakure",
  };

  constructor() {
    this._app = express();
    this._port = process.env.PORT || "5000";

    // init methods -----------------------------------
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  // methods ------------------------------------------

  async dbConnection() {
    try {
      await connect();
    } catch (error) {
      console.log(error);
    }
  }

  // middlewares
  public middlewares() {
    this._app.use(cors());
    this._app.use(express.json());
  }

  // routes
  public routes() {
    this._app.use(this._ApiPaths.auth, authRoutes);
    this._app.use(this._ApiPaths.users, tokenValidator, userRoutes);
    this._app.use(this._ApiPaths.wakure, wakureRoutes);
  }

  // server on
  public listen() {
    this._app.listen(this._port, () => {
      console.log("Server on port", this._port);
    });
  }
}

export default Server;
