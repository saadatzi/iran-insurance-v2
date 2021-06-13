import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Lesson } from "./Vehicle.entity";
import {v4 as uuid} from 'uuid'
import { FilterLessonDTO } from "./dto/filter-lesson.dto";

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) 
        private LessonRepository: Repository<Lesson>,
    ){}


    async createLesson(FilterLessonDTO: FilterLessonDTO): Promise<Lesson>{
        const {name, startDate, endDate} = FilterLessonDTO
        const lesson = this.LessonRepository.create({
            id:uuid(),
            name,
            startDate,
            endDate
        })

        try {
            return this.LessonRepository.save(lesson)
        }catch(err) {
            console.log(err)
        }
    }

    async getLessons(): Promise<Lesson[]> {
        return this.LessonRepository.find();
    }

}