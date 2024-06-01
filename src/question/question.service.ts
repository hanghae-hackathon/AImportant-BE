import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class QuestionService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}
  //문제 저장
  async create(createQuestionDto: CreateQuestionDto) {
    const result = await this.prisma.question.create({
      data: createQuestionDto,
    });
    return result;
  }

  async createMany(createQuestionDtos: CreateQuestionDto[]) {
    const result = await this.prisma.question.createMany({
      data: createQuestionDtos,
    });
    return result;
  }

  // 문제 찾기 유형을 기준으로 랜덤하게 지금 내문제 아이디와 겹치치 않는 문제 리턴
  //api에 유형번호와 현재 문제 번호를 받아와야 함
  // 유형별 문제 목록가져오기 -> 배열 길이 확인 -> 배열길이 기준으로 랜덤 번호 받기 ->
  // 고1 :1 , 고2 :2, 고3 :3, 수능 :4, AI : 5 문제 번호로 API 등에서 구분필요
  // api에서 문제아이디, 문제유형을 받아온다. 그리고 문제유형으로 문제 배열을 받아서, 문제 아이디가 중복된 부분을 배열에서 제외한 배열로 랜덤하게 문제를 제공
  // 푼 문제 아이디 배열도 파라미터로 받아온다.
  //
  //
  //
  async getRandomQuestions(
    questionType: string,
    solvedQuestions: string,
    length: number,
    testType: number,
  ) {
    var result = [];
    var randomNumber = [];
    var arr = [];
    const numbers = new Set();
    let reg = /[\{\}\[\]\\\/ ]/gim;

    const questions = await this.prisma.question.findMany({
      where: { questionType: questionType, testType: testType },
    });

    const str = solvedQuestions.replace(reg, '');
    arr = str.split(',');
    console.log(solvedQuestions);
    console.log('arr.length');
    console.log(arr.length);
    console.log(arr);
    // console.log('solvedQuestions.length');
    // console.log(solvedQuestions.length);
    // console.log('questions.length');
    // console.log(questions.length);
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        // console.log('questions[i].id');
        // console.log(questions[i].id);
        // console.log('solvedQuestions[j]');
        // console.log(arr[j]);
        if (questions[i].id == arr[j]) {
          questions.splice(i, 1);
        }
      }
    }

    while (numbers.size < length) {
      const randomNumber = Math.floor(
        Math.random() * (questions.length - 1 + 1) + 0,
      );

      if (!numbers.has(randomNumber)) {
        numbers.add(randomNumber);
      }
    }
    randomNumber = Array.from(numbers);
    // console.log(randomNumber);
    // console.log(numbers);
    // console.log('After questions.length');
    // console.log(questions.length);
    // console.log(questions[1]);
    // console.log('--------------------');

    // mockScores = Array.from(numbers);

    for (let i = 0; i < length; i++) {
      // console.log(questions[randomNumber[i]]);
      // console.log(i);
      // console.log(randomNumber[i]);
      result.push(questions[randomNumber[i]]);
      // console.log('questions[randomNumber[i]].id');
      // console.log(questions[randomNumber[i]].id);
      // console.log('--------------------------');
    }

    return result;
  }
  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const result = await this.prisma.question.update({
      where: { id: id },
      data: updateQuestionDto,
    });
    return result;
  }

  getDataFromApi(): Observable<any> {
    const url = 'https://ai-eng-tutor.xyz/';
    return this.httpService.get(url).pipe(map((response) => response.data));
  }

  postDataToApi(data: any): Observable<any> {
    const url = 'https://example.com/';
    return this.httpService
      .post(url, data)
      .pipe(map((response) => response.data));
  }

  async findAll() {
    const result = await this.prisma.question.findMany({});
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.question.findUnique({ where: { id: id } });
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
