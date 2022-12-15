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
  tableName: "user",
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 100],
      isEmail: true,
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @ForeignKey(() => Media)
  @Column({
    type: DataType.NUMBER,
  })
  avatar!: number;
  @BelongsTo(() => Media)
  avatarObj!: Media;

  @ForeignKey(() => SubCategory)
  @Column({
    type: DataType.NUMBER,
  })
  status!: number;
  @BelongsTo(() => SubCategory, "status")
  statusObj!: SubCategory;

  @ForeignKey(() => SubCategory)
  @Column({
    type: DataType.NUMBER,
  })
  resetPasswordStatus!: number;
  @BelongsTo(() => SubCategory, "resetPasswordStatus")
  resetPasswordStatusObj!: SubCategory;
}
