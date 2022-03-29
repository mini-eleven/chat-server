import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('friend_message', { schema: 'chat_app' })
export class FriendMessage {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id' })
  user_id: number;

  @Column('int', { name: 'friend_id' })
  friend_id: number;

  @Column('varchar', { name: 'content', length: 500 })
  content: string;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date | null;
}
