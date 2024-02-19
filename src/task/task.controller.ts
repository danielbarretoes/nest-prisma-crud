import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('tasks') // Endpoint name -> localhost:3000/tasks
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks() {
    try {
      return this.taskService.getAllTasks();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    try {
      const taskFound = await this.taskService.getTaskById(Number(id));
      if (!taskFound) throw new Error(); // Call error catch.
      return taskFound;
    } catch (error) {
      throw new NotFoundException('Task does not exists'); // Return error 404 not found with text.
    }
  }

  @Post()
  async createTask(@Body() data: Task) {
    try {
      return this.taskService.createTask(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Task) {
    try {
      return await this.taskService.updateTask(Number(id), data);
    } catch (error) {
      throw new NotFoundException('Task does not exist');
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.taskService.deleteTask(Number(id));
    } catch (error) {
      throw new NotFoundException('Task does not exist');
    }
  }
}
