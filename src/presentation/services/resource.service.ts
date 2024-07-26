import { Resource } from '../../data';
import { CustomError } from '../../domain';
import { CreateResourceDTO } from '../../domain/dtos/resource/create-resource.dto';


export class ResourceService {

  async createResource (createUserDTO: CreateResourceDTO) {
    const { name, description } = createUserDTO;

    const existResource = await Resource.findOne({
      where: 
        { name }
    
    });

    if (existResource) {
      if (existResource.name === name) {
        throw CustomError.badRequest("This name is already taken");
      }
    }
    const resource = new Resource();
    resource.name=name;
    resource.description=description;

    try {
      return await resource.save()
    } catch (error){
      throw CustomError.internalServer("Something went wrong")
    }
  }

  async findOneResourceById(id: number){
    const resource = await Resource.findOne({
      where: {
        id: id
      }
    })

    if (!resource) throw CustomError.notFound("Resource not found")

    return resource;
  }

  async findAllResources(){
    try {
      return await Resource.find();
    } catch (error: any) {
      throw CustomError.internalServer("Something went very wrong! 🧨")
    }
  }

}