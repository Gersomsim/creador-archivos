const controllerTemplate = `
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get, InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ResponseDto } from '../../../response/response.dto';
import { DetailedResponseMapper } from '../../../response/detailed-response-Mapper';
import { ParseError } from "../../common/helpers/error.helper";
import { ErrorLogService } from "../../error/services/error-log.service";
import { ResponseMessages } from "../../common/enums/response-messages.enum";
import { {{entityName}}Service } from '../services/{{entityName}}.service';
import { {{entityName}} } from '../entities/{{entityName}}.entity';
import {
  Create{{entityName}}DTO,
  Update{{entityName}}DTO,
} from '../dtos/{{entityName}}.dto';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('{{entityName}}')
@Controller('{{entityNameLC}}')
export class {{entityName}}Controller {
  constructor(
    private {{entityNameLC}}Service: {{serviceName}}Service,
    private errorLogService: ErrorLogService,
  ) {}
  @Get()
  @ApiOperation({
    summary: 'Regresa toda la data',
    description: 'Esta petición regresa un arreglo',
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401, description: 'No tiene acceso al recurso' })
  async find() {
    try {
      const data = await this.{{entityNameLC}}Service.find();
      const response: ResponseDto<{{entityName}}[]> = { data };
      return DetailedResponseMapper.map(response);
    } catch (e) {
      const error = ParseError(e);
      await this.errorLogService.logError(error);
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(ResponseMessages.INTERNAL_ERROR);
    }
  }
@Get(':{{entityNameLC}}Id')
  @ApiOperation({
    summary: 'Regresa un objeto',
    description:
      'Hace una consulta a base de datos y si encuentra el objeto lo resgresa',
  })
  @ApiResponse({ status: 200, type: {{entityName}} })
  @ApiResponse({ status: 401, description: 'No tiene acceso al recurso' })
  @ApiResponse({ status: 404, description: 'El objeto no se encontro' })
  async findOne(@Param('{{entityNameLC}}Id', ParseIntPipe) {{entityNameLC}}Id: number) {
    try {
      const data = await this.{{entityNameLC}}.findOne({{entityNameLC}}Id);
      const resp: ResponseDto<{{entityName}}> = { data };
      return DetailedResponseMapper.map(resp);
    } catch (e) {
      const error = ParseError(e);
      await this.errorLogService.logError(error);
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(ResponseMessages.INTERNAL_ERROR);
    }
  }
  @Post()
  @ApiOperation({
    summary: 'Crea una concesion',
    description: 'Esta petición crea una concesión',
  })
  @ApiResponse({ status: 200, type: {{entityName}} })
  async create(@Body() payload: Create{{entityName}}DTO) {
    try {
      const data = await this.{{entityNameLC}}.create(payload);
      const response: ResponseDto<{{entityName}}> = {
        data,
        message: ResponseMessages.CREATED,
      };
      return DetailedResponseMapper.map(response);
    } catch (e) {
      const error = ParseError(e);
      await this.errorLogService.logError(error);
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(ResponseMessages.INTERNAL_ERROR);
    }
  }
  @Patch(':{{entityNameLC}}Id')
  @ApiOperation({
    summary: 'Actualiza una concesión',
    description: 'Esta petición actualiza una concesión',
  })
  @ApiResponse({ status: 200, type: {{entityName}} })
  @ApiResponse({ status: 401, description: 'No tiene acceso al recurso' })
  async update(
    @Param('{{entityNameLC}}Id', ParseIntPipe) {{entityNameLC}}Id: number,
    @Body() payload: Update{{entityName}}DTO,
  ) {
    try {
      const data = await this.{{entityNameLC}}.update({{entityNameLC}}Id, payload);
      const response: ResponseDto<{{entityName}}> = {
        data,
        message: ResponseMessages.UPDATED,
      };
      return DetailedResponseMapper.map(response);
    } catch (e) {
      const error = ParseError(e);
      await this.errorLogService.logError(error);
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(ResponseMessages.INTERNAL_ERROR);
    }
  }
  @Delete(':{{entityNameLC}}Id')
  @ApiOperation({
    summary: 'Elimina un objeto',
    description: 'Esta petición elimina',
  })
  @ApiResponse({ status: 401, description: 'No tiene acceso al recurso' })
  async delete(@Param('{{entityNameLC}}Id', ParseIntPipe) {{entityNameLC}}Id: number) {
    try {
      const result = await this.{{entityNameLC}}.delete(concessionID);
      const response: ResponseDto<void> = { message: result.message };
      return DetailedResponseMapper.map(response);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      const error = ParseError(e);
      await this.errorLogService.logError(error);
      throw new InternalServerErrorException(ResponseMessages.INTERNAL_ERROR);
    }
  }
}`;

export {controllerTemplate}