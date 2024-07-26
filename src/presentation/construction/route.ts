import { Router } from "express";
import { PlayerService } from "../services/player.service";
import { ConstructionService } from "../services/construction.service";
import { ConstructionController } from "./controller";
import { UserService } from "../services/user.service";


export class ConstructionRoutes {


    static get routes(): Router {
        const router = Router();

        const userService = new UserService()
        const playerService = new PlayerService(userService);
        const constructionService = new ConstructionService(playerService);
        const constructionController = new ConstructionController(constructionService);
 

    
       router.post('/:playerId', constructionController.createConstruction)
    
        return router;
      }


}