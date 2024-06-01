import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { JwtAuthGuard } from 'src/user/jwt/jwt.guard';

@Controller('history')
@UseGuards(JwtAuthGuard)
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post('/:id')
  async create(
    @Param('id', ParseIntPipe) uid: number,
    @Body() createHistoryDto: CreateHistoryDto,
  ) {
    const result = await this.historyService.create(uid, createHistoryDto);
    console.log('History created:', result);
    return result;
  }
  @Get()
  findAll() {
    return this.historyService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: string) {
  //   return this.historyService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: string,
  //   @Body() updateHistoryDto: UpdateHistoryDto,
  // ) {
  //   return this.historyService.update(+id, updateHistoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: string) {
  //   return this.historyService.remove(+id);
  // }
}
