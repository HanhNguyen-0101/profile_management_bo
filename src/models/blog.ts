import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Media } from "./media";
import { SubCategory } from "./subCategory";

@Table({
  timestamps: true,
  tableName: "blog",
})
export class Blog extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  subTitle!: string;

  @Column({
    type: DataType.TEXT,
  })
  description!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @ForeignKey(() => Media)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  thumnail!: number;
  @BelongsTo(() => Media)
  media!: Media;

  @ForeignKey(() => SubCategory)
  @Column
  subCategoryId!: number;
  @BelongsTo(() => SubCategory)
  subCategory!: SubCategory;
}
