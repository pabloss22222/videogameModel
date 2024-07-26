import { describe } from "node:test";

export class CreateResourceDTO {
    private constructor(
      public readonly name: string,
      public readonly description: string
    ){}
  
   
    static create( object: { [key : string] : any } ): [string?, CreateResourceDTO?] {
      
      const { name, description } = object;
  
      if( !name ) return ['name is required']
      if( !description ) return ['name is required']
  
      return [undefined, new CreateResourceDTO( name, description )]
    }
  }
  