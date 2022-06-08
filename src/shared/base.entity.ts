import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {

    @PrimaryGeneratedColumn('uuid') id: string;

    @CreateDateColumn() createdOn?: Date;

    @UpdateDateColumn() updatedOn?: Date;
}