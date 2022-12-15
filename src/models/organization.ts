import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Project } from "./project";

@Table({
  timestamps: true,
  tableName: "organization",
})
export class Organization extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description!: string;

  @HasMany(() => Project)
  projects!: Project[];
}
