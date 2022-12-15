import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Organization } from "./organization";
import { SubCategory } from "./subCategory";

@Table({
  timestamps: true,
  tableName: "project",
})
export class Project extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
  })
  link!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  technical!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  date!: string;

  @Column({
    type: DataType.STRING,
  })
  members!: string;

  @Column({
    type: DataType.STRING,
  })
  images!: string;

  @ForeignKey(() => Organization)
  @Column({
    type: DataType.NUMBER,
  })
  organizationId!: number;
  @BelongsTo(() => Organization)
  organization!: Organization;

  @ForeignKey(() => SubCategory)
  @Column({
    type: DataType.NUMBER,
  })
  subCategoryId!: number;
  @BelongsTo(() => SubCategory)
  subCategory!: SubCategory;
}
