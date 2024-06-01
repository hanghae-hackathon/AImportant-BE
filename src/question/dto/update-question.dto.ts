import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(
  PickType(CreateQuestionDto, [
    'answer',
    'article',
    'keyWords',
    'options',
    'question',
    'questionNumber',
    'questionType',
    'solution',
    'testNumber',
    'testType',
  ] as const),
) {}
