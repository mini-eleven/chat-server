import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('group', { schema: 'chat_app' })
export class Group {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 20 })
  name: string;

  @Column('varchar', { name: 'notice', length: 200 })
  notice: string;

  @Column('int', { name: 'created_user', comment: '创建人', unsigned: true })
  created_user: number;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date | null;
}
