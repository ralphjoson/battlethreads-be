import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserStat {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'int', default: 10 })
  attack: number;

  @Column({ type: 'int', default: 6 })
  defense: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: parseFloat('0.00'),
  })
  critical_chance: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: parseFloat('1.00'),
  })
  critical_damage_modifier: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: parseFloat('3.00'),
  })
  dodge_chance: number;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 10 })
  agility: number;

  @Column({ default: 100 })
  health: number;

  @Column({ default: 0 })
  experience_points: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
