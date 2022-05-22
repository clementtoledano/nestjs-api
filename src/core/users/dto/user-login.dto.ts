import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({ description: 'un email', example: 'aze@aze.aze' })
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({ description: 'Un mot de passe', example: 'azeaze' })
    @IsNotEmpty()
    readonly password: string;
}