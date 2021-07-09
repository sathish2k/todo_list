import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDTO {
  @ApiProperty()
  readonly name: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
}
