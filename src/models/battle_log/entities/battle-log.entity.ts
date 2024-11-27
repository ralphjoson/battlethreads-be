import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BattleLog {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'uuid' })
  battle_id: string;

  @Column('uuid', { array: true })
  winners: string[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
