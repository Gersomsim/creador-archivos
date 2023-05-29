const serviceTemplate = `
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';
import {
  Create{{entityNameLC}}DTO,
  Update{{entityNameLC}}DTO,
} from '../dtos/{{entityNameLC}}.dto';
import { ResponseMessages } from '../../common/enums/response-messages.enum';

@Injectable()
export class {{serviceName}}Service {
  constructor(
    @InjectRepository({{entityName}})
    private {{entityNameLC}}Repository: Repository<{{entityName}}>,
  ) {}

  find() {
    return this.{{entityNameLC}}Repo.find();
  }

  async findOne(id: number) {
    const {{entityNameLC}} = await this.{{entityNameLC}}Repo.findOne({ where: { id } });
    if (!{{entityNameLC}}) {
      throw new NotFoundException(ResponseMessages.RECORD_NOT_FOUND);
    }
    return {{entityNameLC}};
  }

  create(payload: Create{{entityName}}DTO) {
    const new{{entityName}} = this.{{entityNameLC}}Repo.create(payload);
    // TODO: revisar si el objeto lleva relaciones
    return this.{{entityNameLC}}Repo.save(new{{entityName}});
  }

  async update({{entityNameLC}}ID: number, payload: Update{{entityName}}DTO) {
    const {{entityNameLC}} = await this.findOne({{entityNameLC}}ID);
    this.{{entityNameLC}}Repo.merge({{entityNameLC}}, payload);
    return this.{{entityNameLC}}Repo.save({{entityNameLC}});
  }

  async delete({{entityNameLC}}Id: number) {
    const result = await this.{{entityNameLC}}Repo.softDelete({{entityNameLC}}Id);
    if (result.affected === 0) {
      throw new NotFoundException(ResponseMessages.RECORD_NOT_FOUND);
    }
    return { message: ResponseMessages.DELETED };
  }
}`;

export {serviceTemplate}