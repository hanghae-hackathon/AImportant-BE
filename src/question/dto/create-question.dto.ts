import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
 
  @IsNotEmpty()
  @IsString()
  testNumber: string;

  @IsNotEmpty()
  @IsNumber()
  testType: number;

  @IsNotEmpty()
  @IsNumber()
  questionNumber: number;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  article: string;

  @IsNotEmpty()
  @IsString()
  options: string;

  @IsNotEmpty()
  @IsNumber()
  answer: number;

  @IsNotEmpty()
  @IsString()
  questionType: string;

  @IsNotEmpty()
  @IsString()
  solution: string;

  @IsNotEmpty()
  @IsString()
  keyWords: string;
}
