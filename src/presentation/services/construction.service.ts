import { Construction } from "../../data"
import { CustomError } from "../../domain";
import { CreateConstructionDTO } from "../../domain/dtos/construction/create-construction.dto";
import { PlayerService } from "./player.service";

export class ConstructionService{

    constructor(
        private readonly playerService: PlayerService
    ){}

    async createConstruction(createConstructionDTO: CreateConstructionDTO, playerId: number){


       const playerPromise =  this.playerService.findOnePlayer(playerId); 
  
       const constructionPromise =  this.findOneConstructionByName(createConstructionDTO.name) 

       const [playerData, _] = await Promise.all([playerPromise, constructionPromise]) 
    
       const construction = new Construction();
       
       construction.name = createConstructionDTO.name.toLocaleLowerCase().trim();
       construction.level = createConstructionDTO.level
       construction.location = createConstructionDTO.location.toLocaleLowerCase().trim();
       construction.type = createConstructionDTO.type.toLocaleLowerCase().trim();
       construction.player = playerData;

       try {
         await construction.save();
         return construction;
       } catch (error){
         throw CustomError.internalServer("Something went wrong")
       }

    }

    async findOneConstructionByName(name: string){
        const construction = await Construction.findOne({
          where: {
            name  
          }
        })
    
        if (construction) throw CustomError.badRequest("This name is already taken")
    
        return construction;
    }










}