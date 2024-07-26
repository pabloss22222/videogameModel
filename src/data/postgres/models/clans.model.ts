


import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ClanMember } from './clanMember.model';

@Entity()
export class Clan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {length: 100, nullable: false})
  name: string;

  @Column('text', {nullable: false}) // le agregue segun diseño sql !!!
  description: string;

  @OneToMany(() => ClanMember, (clanMember) => clanMember.clan)
  clanMembers: ClanMember[];
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}