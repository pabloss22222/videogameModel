import { Clan, ClanMember, ClanMemberRole } from '../../data';
import { CustomError, JoinMember } from '../../domain';
import { CreateClanDTO } from '../../domain/dtos/clan/create-clan.dto';
import { PlayerService } from './player.service';


export class ClanService {

  constructor(
    private readonly playerService: PlayerService
  ){}

  async addMemberToClan(playerReceiverId: number, joinMemberDTO: JoinMember){
    const playerReceiverPromise = this.playerService.findOnePlayer(playerReceiverId);
    const playerSenderPromise = this.playerService.findOnePlayer(joinMemberDTO.senderMemberId)

    const [playerReceiver, playerSender] = await Promise.all([playerReceiverPromise, playerSenderPromise])

    if(!playerReceiver) throw CustomError.notFound("Player Receiver not found")
    if(!playerSender) throw CustomError.notFound("Player Sender not found")
    
    const allowedRoles = [ClanMemberRole.MASTER, ClanMemberRole.OFFICER, ClanMemberRole.SUBOFFICER]
    
    if(!allowedRoles.includes(playerSender.clanMembers[0].role)){
      throw CustomError.badRequest("You don't have permission to join this clan")
    }
    
    const clanMember = new ClanMember();
    clanMember.player = playerReceiver;
    clanMember.clan = playerSender.clanMembers[0].clan;

    try {
      return await clanMember.save()
    } catch (error) {
      throw CustomError.internalServer("Something went wrong")
    }
  }

  async createClan (createClanDTO: CreateClanDTO) {
    const { name, description } = createClanDTO;

    const existClan = await Clan.findOne({
      where: 
        { name }
    });

    if (existClan) {
      if (existClan.name === name) {
        throw CustomError.badRequest("This name is already taken");
      }
    }
    const clan = new Clan();
    clan.name=name;
    clan.description=description;

    try {
      return await clan.save()
    } catch (error){
      throw CustomError.internalServer("Something went wrong")
    }
  }
  async findMembersOfOneClan(clanId: number){

    const clan = await Clan.findOne({
      where: {
        id:clanId
      },
      relations:{
        clanMembers:{
          player:true
        }
      }
    })
    if(!clan) throw CustomError.badRequest('This clan not existing')
    return clan;
  }

}