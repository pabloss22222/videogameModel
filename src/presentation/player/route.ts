

import { Router } from 'express';
import { PlayerController } from './controller';
import { UserService } from '../services/user.service';
import { PlayerService } from '../services/player.service';
import { InventoryService } from '../services/inventory.service';
import { ItemService } from '../services/item.service';
import { ResourceService } from '../services/resource.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';


export class PlayerRoutes {
  
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const playerService = new PlayerService(userService);
    const itemService = new ItemService();
    const resourceService = new ResourceService();
    const inventoryService = new InventoryService(itemService, resourceService);
    const playerController = new PlayerController(playerService, inventoryService)

    router.use(AuthMiddleware.protect)
    router.post('/', playerController.createPlayer)
    router.get('/:id', playerController.findOnePlayer)

    router.post('/:id/invetory/items', playerController.addItemToInventory)
    router.get('/:id/inventory', playerController.findPlayerInventory)

    router.get('/:id/construction', playerController.findConstructionsOnePlayer)
    router.get('/:id/quests', playerController.findQuestsOfOnePlayer)
    return router;
  }

}

