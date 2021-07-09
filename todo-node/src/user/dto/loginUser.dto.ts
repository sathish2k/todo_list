import { ApiProperty } from '@nestjs/swagger';
export class LoginUserDTO {
  @ApiProperty()
  readonly email: string;
  readonly password: string;
}
