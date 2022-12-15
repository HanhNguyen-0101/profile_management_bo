import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { SubCategory } from "./subCategory";

@Table({
  timestamps: true,
  tableName: "category",
})
export class Category extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description!: string;

  @HasMany(() => SubCategory)
    subCategories!: SubCategory[];
}
