import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_friend', { schema: 'chat_app' })
export class UserFriend {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id' })
  user_id: number;

  @Column('int', { name: 'friend_id' })
  friend_id: number;
}
