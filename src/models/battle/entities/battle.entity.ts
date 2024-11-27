import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum BattleStatus {
  IN_PROGRESS = 'IN-PROGRESS',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Battle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { array: true })
  attackers: string[];

  @Column({ type: 'uuid' })
  defender_id: string;

  @Column({ type: Number, default: 0 })
  damage: number;

  @Column({
    type: 'enum',
    enum: BattleStatus,
    default: BattleStatus.IN_PROGRESS,
  })
  status: BattleStatus;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
