import { Request, Response } from 'express';
import { CreateResourceDTO } from '../../domain/dtos/resource/create-resource.dto';
import { ResourceService } from '../services/resource.service';
import { CustomError } from '../../domain';


export class ResourceController {
    constructor(
        private readonly resourceService: ResourceService
      ){}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ message: error.message })
        }
    
        console.log(error)
        return res.status(500).json({ message: 'Something went very wrong! 🧨' })
    }

    createResource = async (req: Request, res: Response) => {
        const [ error, createResourceDTO ] = CreateResourceDTO.create(req.body);
        if( error ) return res.status(422).json({ message: error })
    
        this.resourceService.createResource(createResourceDTO!)
          .then(resource  => res.status(201).json(resource))
          .catch(error => this.handleError(error, res))
    }
    findAllResources = async (_req: Request, res: Response) => {
      
      this.resourceService.findAllResources()
        .then(resource => res.status(200).json(resource))
        .catch(error => this.handleError(error, res))
    }




}