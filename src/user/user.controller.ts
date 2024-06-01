import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('user')
@UseInterceptors(SuccessInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const findByEmail = await this.userService.findByEmail(createUserDto.email);
    if (findByEmail) {
      throw new ForbiddenException('해당 이메일을 이미 사용중입니다.');
    }

    await this.userService.create(createUserDto);

    const token = await this.userService.jwtLogin(createUserDto);
    return {
      token,
    };
  }

  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto) {
    const token = await this.userService.jwtLogin(loginRequestDto);
    return {
      token,
    };
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id',ParseIntPipe) id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: string) {
  //   return this.userService.remove(+id);
  // }
}
