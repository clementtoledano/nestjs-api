import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({ description: 'un email', example: 'john.malpest@example.com' })
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({ description: 'Un mot de passe', example: 'secret' })
    @IsNotEmpty()
    readonly password: string;
}