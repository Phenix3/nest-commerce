import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/auth.decorator';
import { Role } from './enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.addUser(createUserDto);
  }

  @UseGuards(LocalGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.User)
  @Get('/user')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/admin')
  async getDashboard(@Request() req) {
    return req.user;
  }
}
