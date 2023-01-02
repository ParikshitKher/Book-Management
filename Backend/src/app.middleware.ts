import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';

interface UserRequest extends Request {
  user: any;
}

@Injectable()
export class isAuthenticated implements NestMiddleware {
  constructor(
    private readonly jwt: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: UserRequest, res: Response, next: NextFunction) {
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await this.jwt.verify(token);
        const user = await this.usersService.getOne(decoded.email);
        if (user) {
          req.user = user;
          next();
        } else {
          throw new UnauthorizedException('Unauthorized');
        }
      } else {
        throw new NotFoundException('No Token Found');
      }
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
