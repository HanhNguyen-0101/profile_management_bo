import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Blog } from "./blog";
import { Category } from "./category";
import { Media } from "./media";
import { Project } from "./project";
import { User } from "./user";

@Table({
  timestamps: true,
  tableName: "subCategory",
})
export class SubCategory extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
  })
  description!: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.NUMBER,
  })
  categoryId!: number;

  @BelongsTo(() => Category)
  category!: Category;

  @HasMany(() => Media)
  medias!: Media[];

  @HasMany(() => Project)
  projects!: Project[];

  @HasMany(() => Blog)
  blogs!: Blog[];

  @HasMany(() => User, "status")
  statusUsers!: User[];

  @HasMany(() => User, "resetPasswordStatus")
  resetStatusUsers!: User[];
}
