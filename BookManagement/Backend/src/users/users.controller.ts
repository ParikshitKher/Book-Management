import { User } from './schema/User';
import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Res() response, @Body() user: User) {
    const newUser = await this.usersService.signup(user);
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  @Post('signin')
  async signin(@Body() user: User) {
    return await this.usersService.signin(user, this.jwtService);
  }
}
