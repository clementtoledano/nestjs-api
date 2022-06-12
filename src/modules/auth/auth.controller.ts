import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../user/dto/create.user.dto";
import { LoginUserDto } from "../user/dto/login.user.dto";
import { AuthService } from "./auth.service";
import { LoginStatusI } from "./interfaces/login-status.interface";
import { JwtPayloadI } from "./interfaces/payload.interface";
import { RegistrationStatusI } from "./interfaces/registration-status.interface";

@ApiBearerAuth()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async register(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatusI> {
        const result: RegistrationStatusI = await this.authService.register(createUserDto);

        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }


    @Post('login')
    @ApiOperation({ summary: 'Creates a JWT token for an authorized user' })
    @ApiResponse({ description: 'JWT token', type: String })
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatusI> {
        return await this.authService.login(loginUserDto);
    }

    @Get('whoami')
    public testAuth(@Req() req: any): Promise<JwtPayloadI> {
        console.log(req);

        return req.user;
    }
}