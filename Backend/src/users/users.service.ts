import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/User';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { secret } from 'src/utils/constants';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);

    const reqBody = {
      username: user.username,
      email: user.email,
      password: hash,
    };
    const newUser = new this.userModel(reqBody);
    return newUser.save();
  }

  async signin(user: User, jwt: JwtService): Promise<any> {
    const foundUser = await this.userModel
      .findOne({ email: user.email })
      .exec();
    if (foundUser) {
      const { password } = foundUser;
      const data = await bcrypt.compare(user.password, password);
      if (data) {
        const payload = { email: user.email };
        return {
          token: jwt.sign(payload, {
            secret,
          }),
          userId: foundUser._id,
        };
      } else {
        return new UnauthorizedException();
      }
    } else {
      return new UnauthorizedException();
    }
  }
  async getOne(email): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
}
