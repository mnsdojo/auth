import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthPayloadDto } from 'src/dto/auth.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { LocalGuard } from 'src/guards/local.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @ApiOperation({ summary: 'Login User' })
  @ApiBody({ type: AuthPayloadDto })
  @ApiResponse({
    status: 200,
    description: 'Login Success',
  })
  login(@Request() req: Request, @Body() authPayload: AuthPayloadDto) {
    const user = this.authService.validateUser(authPayload);
    return user;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log(req);
  }
}
