export class CreateQuestDTO{

    private constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly reward: string,
        public readonly exp: number
      ){}
    
      static create( object: { [key : string] : any } ): [string?, CreateQuestDTO?] {
        
        const { name, description, reward, exp } = object;
    
        if( !name ) return ['name is required']
        if( !description ) return ['name is required']
        if( !reward ) return ['name is required']
    
        return [undefined, new CreateQuestDTO( name, description, reward, exp )]
      }

}