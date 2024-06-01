import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/login-request.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // createUserDto.password = hashedPassword;

    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return user;
  }
  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email: email },
    });
    return user;
  }

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;

    //* email
    const user = await this.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    //* password
    // const isPasswordValidated: boolean = await bcrypt.compare(
    //   password,
    //   user.password,
    // );

    if (user.password != password) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const payload = { email: email, sub: user.id };

    return this.jwtService.sign(payload);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
