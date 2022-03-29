import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', { schema: 'chat_app' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 20 })
  name: string;

  @Column('varchar', { name: 'password', length: 200 })
  password: string;

  @Column('varchar', { name: 'avatar', length: 200 })
  avatar: string;

  @Column('varchar', { name: 'tag', nullable: true, length: 50 })
  tag: string | null;

  @Column('varchar', { name: 'role', nullable: true, length: 10 })
  role: string | null;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date | null;
}
