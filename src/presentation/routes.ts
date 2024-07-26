
import { Router } from 'express';
import { PlayerRoutes } from './player/route';
import { UserRoutes } from './user/routes';
import { InventoryRoutes } from './inventory/controller';
import { ClanRoutes } from './clan/route';
import { QuestRoutes } from './quest/routes';
import { ResourceRoutes } from './resource/route';
import { ConstructionRoutes } from './construction/route';

export class AppRoutes {
  
  static get routes(): Router {
    const router = Router();

    
    router.use('/api/v1/player', PlayerRoutes.routes);
    router.use('/api/v1/user', UserRoutes.routes);
    router.use('/api/v1/inventory', InventoryRoutes.routes)
    router.use('/api/v1/clan', ClanRoutes.routes)
    router.use('/api/v1/quest', QuestRoutes.routes)
    router.use('/api/v1/resource', ResourceRoutes.routes)
    router.use('/api/v1/construction', ConstructionRoutes.routes)
    return router; // papitas
  }

}

