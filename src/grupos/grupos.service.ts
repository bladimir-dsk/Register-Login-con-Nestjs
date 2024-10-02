import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Grupo } from './entities/grupo.entity';
import { Repository } from 'typeorm';
import { Salone } from 'src/salones/entities/salone.entity';
import * as ExcelJS from 'exceljs';
import { Response } from 'express'; // Necesitarás esto si vas a devolver el archivo al cliente

@Injectable()
export class GruposService {
  constructor(
    @InjectRepository(Grupo) private readonly gruposervice: Repository<Grupo>,
    @InjectRepository(Salone) private readonly saloneservice: Repository<Salone>
  ) {}

  async create(createGrupoDto: CreateGrupoDto) {
    // Busca los salones por sus IDs (si son múltiples)
    const salones = await this.saloneservice.findByIds(createGrupoDto.salonesIds);
  
    if (salones.length === 0) {
      throw new NotFoundException('No se encontraron salones válidos.');
    }
  
    // Crea el nuevo grupo y lo asocia con los salones
    const nuevoGrupo = this.gruposervice.create({
      ...createGrupoDto,
      salones: salones,  // Asocia los salones con el grupo
    });
  
    // Guarda el grupo en la base de datos
    return await this.gruposervice.save(nuevoGrupo);
  }
  async findAll() {
    const grupos = await this.gruposervice.find({
      relations: ['evaluador','salones'],
    });

    // Filtra los grupos que tienen evaluadores
    const gruposConEvaluador = grupos.filter(grupo => grupo.evaluador.length > 0);

    if (gruposConEvaluador.length === 0) {
      throw new NotFoundException('No se encontró ningún grupo con evaluador.');
    }

    // Ordena los grupos por la calificación más alta de su evaluador (de mayor a menor)
    const gruposOrdenados = gruposConEvaluador.sort((a, b) => {
      const calificacionA = a.evaluador[0].calificacion;
      const calificacionB = b.evaluador[0].calificacion;
      return calificacionB - calificacionA; // Orden descendente
    });

    // Obtén los primeros 3 grupos con las calificaciones más altas
    const top3Grupos = gruposOrdenados.slice(0, 3);

    return top3Grupos;
  }

  async exportTop3GruposToExcel(res: Response) {
    const top3Grupos = await this.findAll(); // Reutilizamos el método para obtener los 3 grupos con mayor calificación
  
    // Crear un nuevo workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Top 3 Grupos');
  
    // Agregar encabezados
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre del Grupo', key: 'nombre', width: 30 },
      { header: 'Salones', key: 'salones', width: 30 }, // Cambio: "Salón" -> "Salones"
      { header: 'Evaluador', key: 'evaluador', width: 30 },
      { header: 'Calificación', key: 'calificacion', width: 15 },
    ];
  
    // Agregar los datos de los grupos
    top3Grupos.forEach(grupo => {
      // Si quieres mostrar todos los salones asociados, puedes unir los nombres en una cadena
      const nombresSalones = grupo.salones.map(salon => salon.nombre).join(', ') || 'Sin Salón';
      const evaluadorNombre = grupo.evaluador[0]?.nombre || 'Sin Evaluador';
      const calificacion = grupo.evaluador[0]?.calificacion || 'Sin Calificación';
  
      worksheet.addRow({
        id: grupo.id,
        nombre: grupo.nombre,
        salones: nombresSalones, // Cambio: Ahora incluye todos los salones
        evaluador: evaluadorNombre,
        calificacion: calificacion,
      });
    });
  
    // Estilizar los encabezados
    worksheet.getRow(1).font = { bold: true };
  
    // Exportar el archivo Excel
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=Top3Grupos.xlsx');
  
    await workbook.xlsx.write(res);
    res.end();
  }
  findtodos() {
    return this.gruposervice.find({ relations: { evaluador: true } });
  }

  async findOne(id: number) {
    const grupo = await this.gruposervice.findOne({ where: { id: id } });
    if (!grupo) {
      throw new NotFoundException(`Grupo #${id} no encontrado.`);
    }
    return grupo;
  }

  update(id: number, updateGrupoDto: UpdateGrupoDto) {
    return `This action updates a #${id} grupo`;
  }

  remove(id: number) {
    return `This action removes a #${id} grupo`;
  }
}
