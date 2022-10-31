// @IsString()
// @IsOptional()
// @MinLength(1)
// @MaxLength(15)

import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, MinLength, MaxLength } from "class-validator";

export function IdentifierDescription() {
  return applyDecorators(
    ApiProperty({
      description: 'user identifier ( it is same id when you login any site )',
      minLength: 1,
      maxLength: 15
    }),
    IsString(),
    IsOptional(),
    MinLength(1),
    MaxLength(15)
  )
}

export function NicknameDescription() {
  return applyDecorators(
    ApiProperty({
      description: 'user nickname',
      minLength: 1,
      maxLength: 10
    }),
    IsString(),
    MinLength(1),
    MaxLength(10)
  )
}

export function EmailDescription() {
  return applyDecorators(
    ApiProperty({
      description: 'user email',
      minLength: 1,
      maxLength: 45
    }),
    IsString(),
    MinLength(1),
    MaxLength(45)
  )
}


export function ProviderDescription() {
  return applyDecorators(
    ApiProperty({
      description: 'user email',
      minLength: 1,
      maxLength: 8
    }),
    IsString(),
    IsOptional(),
    MinLength(1),
    MaxLength(8)
  )
}

export function ImagePathDescription() {
  return applyDecorators(
    ApiProperty({
      description: 'user email',
      minLength: 1,
      maxLength: 256
    }),
    IsString(),
    IsOptional(),
    MinLength(1),
    MaxLength(256)
  )
}
// @Column({
//   type: 'varchar',
//   length: 10,
// })
// nickname: string

// @Column({
//   type: 'varchar',
//   length: 45
// })
// email: string

// @Column({
//   type: 'varchar',
//   length: 8
// })
// provider: string

// @Column({
//   type: 'varchar',
//   nullable: true
// })
// imagePath: string