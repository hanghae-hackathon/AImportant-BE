import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Query,
  ParseArrayPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { JwtAuthGuard } from 'src/user/jwt/jwt.guard';

@Controller('question')
@UseInterceptors(SuccessInterceptor)
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post() // 문제 입력 api
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }
  @Post('/many') // 문제 입력 api
  createQuestionMany(@Body() createQuestionDtos: CreateQuestionDto[]) {
    return this.questionService.createMany(createQuestionDtos);
  }

  @Get('/random') // 랜덤 문제 호출 api
  async getRandomQuestions(
    @Query('questionType') questionType: string,
    @Query('solvedQuestions') solvedQuestions: string,
    @Query('length') length: number,
    @Query('testType') testType: number,
  ) {
    return await this.questionService.getRandomQuestions(
      questionType,
      solvedQuestions,
      length,
      testType,
    );
  }

  //문제 수정 api
  @Patch(':id')
  updateQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Get('test')
  test() {
    return this.questionService.getDataFromApi();
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.questionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.questionService.remove(+id);
  }
}
