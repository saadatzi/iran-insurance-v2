import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { LessonService } from './lesson.service';
import { Lesson } from './province.entity';
import { FilterLessonDTO } from './dto/filter-lesson.dto';


// @ApiHeader({
//   name: 'Authorization',
//   description: 'Auth Token'
// })
@UseGuards(AuthGuard('jwt'))
@Controller('lesson')
export class LessonController {
  constructor(private readonly LessonService: LessonService) {}
  
  @Get()
  @ApiBearerAuth()
  getLessons(): Promise<Lesson[]> {
    return this.LessonService.getLessons();
  }
  
  @Post()
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createLesson(
      @Body() FilterLessonDTO: FilterLessonDTO,
      // @Req() req: any,
  ): Promise<Lesson> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.LessonService.createLesson(FilterLessonDTO)
  }
}