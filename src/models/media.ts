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
import { SubCategory } from "./subCategory";
import { User } from "./user";

@Table({
  timestamps: true,
  tableName: "media",
})
export class Media extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  src!: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  enabled!: boolean;

  @Column({
    type: DataType.STRING,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
  })
  description!: string;

  @ForeignKey(() => SubCategory)
  @Column({
    type: DataType.NUMBER,
  })
  subCategoryId!: number;

  @BelongsTo(() => SubCategory)
  subCategory!: SubCategory;

  @HasMany(() => Blog)
  blogs!: Blog[];

  @HasMany(() => User)
  users!: User[];
}
