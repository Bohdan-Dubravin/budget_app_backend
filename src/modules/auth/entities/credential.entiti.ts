import { ApiProperty } from '@nestjs/swagger';

export class CredentialsForAuth {
  @ApiProperty({
    example: 'afiueunocmewcewvw3872h3uc9239pc32',
    description: 'Token for attaching in headers for each request',
  })
  accessToken: string;

  @ApiProperty({
    example: 'afiueunocmewcewvw3872h3uc9239pc32',
    description: 'Token for attaching in cookies for each request',
  })
  refreshToken: string;
}
