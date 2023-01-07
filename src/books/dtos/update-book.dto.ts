import {
  IsNotEmpty,
  Length,
  IsString,
  IsNumber,
  Min,
  Max,
  IsUUID,
} from 'class-validator';
export class UpdateBookDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  authorId: string;
}
