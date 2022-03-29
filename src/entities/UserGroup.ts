import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_group', { schema: 'chat_app' })
export class UserGroup {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id' })
  user_id: number;

  @Column('int', { name: 'group_id' })
  group_id: number;
}
