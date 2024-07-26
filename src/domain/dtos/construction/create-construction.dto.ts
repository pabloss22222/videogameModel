
export class CreateConstructionDTO {
    private constructor(
      public readonly name: string,
      public readonly type: string,
      public readonly level: number,
      public readonly location: string

    ){}
  
   
    static create( object: { [key : string] : any } ): [string?, CreateConstructionDTO?] {
      
      const { name, type, level, location } = object;
  
      if( !name ) return ['name is required']
      if( !type ) return ['name is required']
      if( !level ) return ['name is required']
      if( !location ) return ['name is required']

      return [undefined, new CreateConstructionDTO( name, type, level, location )]
    }
  }
  