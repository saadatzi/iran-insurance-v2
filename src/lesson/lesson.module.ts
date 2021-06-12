import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service'
import { LessonController } from './lesson.controller'
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Lesson]),
        AuthModule
    ],
    providers: [LessonService],
    controllers : [LessonController]
})
export class LessonModule {}
