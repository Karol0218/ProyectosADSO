
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DatePipe, MatCardModule
  ],
  selector: 'app-gestion',
  styleUrl: './gestion.css',
  templateUrl: './gestion.html',
})
export class Gestion implements OnInit{

    ngOnInit(): void {
      const datos = localStorage.getItem('instructores');

      if (datos) {
        this.instructores = JSON.parse(datos);
      }

      // Cargar competencias guardadas
      const datosCompetencias = localStorage.getItem('competencias');

      if (datosCompetencias) {
        this.competencias = JSON.parse(datosCompetencias);
      }

     const datosAsignaciones = localStorage.getItem('asignaciones');

      if (datosAsignaciones) {
        this.asignaciones = JSON.parse(datosAsignaciones);
      }
      const datosFichas = localStorage.getItem('fichas');

      if (datosFichas) {
        this.fichas = JSON.parse(datosFichas).map((f: any) => ({
          ...f,
          fechaInicio: f.fechaInicio ? new Date(f.fechaInicio) : null,
          fechaFin: f.fechaFin ? new Date(f.fechaFin) : null
      }));
    }
  }
  // =====================================
  // INSTRUCTORES (TU CÓDIGO ORIGINAL)
  // =====================================

  columnasInstructores: string[] = [
    'id',
    'nombre',
    'telefono',
    'correo',
    'cargo',
    'planta',
    'liderFicha',
    'acciones'
  ];

  instructores: any[] = [];

  mostrarFormulario = false;

  nuevoInstructor = {
    id: 0,
    nombre: '',
    telefono: '',
    correo: '',
    cargo: '',
    planta: false,
    liderFicha: false
  };

  guardarInstructor(): void {
    const instructor = {
      id: this.nuevoInstructor.id,
      nombre: this.nuevoInstructor.nombre,
      telefono: this.nuevoInstructor.telefono,
      correo: this.nuevoInstructor.correo,
      cargo: this.nuevoInstructor.cargo,
      planta: this.nuevoInstructor.planta,
      liderFicha: this.nuevoInstructor.liderFicha
    };

    if (this.instructorEditando !== null) {
      this.instructores = this.instructores.map(i =>
        i.id === this.instructorEditando ? instructor : i
      );
    } else {
      this.instructores.push(instructor);
    }

    localStorage.setItem(
      'instructores',
      JSON.stringify(this.instructores)
    );

    this.mostrarFormulario = false;
    this.instructorEditando = null;
  }

  instructorEditando: number | null = null;

  editarInstructor(instructor: any): void {
    this.instructorEditando = instructor.id;

    this.nuevoInstructor = {
      id: instructor.id,
      nombre: instructor.nombre,
      telefono: instructor.telefono,
      correo: instructor.correo,
      cargo: instructor.cargo,
      planta: instructor.planta,
      liderFicha: instructor.liderFicha
    };

    this.mostrarFormulario = true;
  }

  eliminarInstructor(id: number): void {
    const confirmar = confirm('¿Deseas eliminar este instructor?');

    if (confirmar) {
      this.instructores = this.instructores.filter(
        instructor => instructor.id !== id
      );

      localStorage.setItem(
        'instructores',
        JSON.stringify(this.instructores)
      );
    }
  }

 

  // =====================================
  // COMPETENCIAS (MISMA ESTRUCTURA)
  // =====================================

  columnasCompetencias: string[] = [
    'id',
    'nombre',
    'tipo',
    'duracion',
    'acciones'
  ];

  competencias: any[] = [];

  mostrarFormularioCompetencia = false;

  nuevaCompetencia = {
    id: 0,
    nombre: '',
    tipo: '',
    duracion: 0
  };

  competenciaEditando: number | null = null;

  abrirNuevaCompetencia(): void {
    this.competenciaEditando = null;

    const siguienteId = this.competencias.length > 0
      ? Math.max(...this.competencias.map(c => c.id)) + 1
      : 1;

    this.nuevaCompetencia = {
      id: siguienteId,
      nombre: '',
      tipo: '',
      duracion: 0
    };

    this.mostrarFormularioCompetencia = true;
  }

  guardarCompetencia(): void {
    const competencia = {
      id: this.nuevaCompetencia.id,
      nombre: this.nuevaCompetencia.nombre,
      tipo: this.nuevaCompetencia.tipo,
      duracion: this.nuevaCompetencia.duracion
    };

    if (this.competenciaEditando !== null) {
      this.competencias = this.competencias.map(c =>
        c.id === this.competenciaEditando ? competencia : c
      );
    } else {
      this.competencias = [...this.competencias, competencia];    }

    localStorage.setItem(
      'competencias',
      JSON.stringify(this.competencias)
    );

    this.mostrarFormularioCompetencia = false;
    this.competenciaEditando = null;
  }

  editarCompetencia(competencia: any): void {
    this.competenciaEditando = competencia.id;

    this.nuevaCompetencia = {
      id: competencia.id,
      nombre: competencia.nombre,
      tipo: competencia.tipo,
      duracion: competencia.duracion
    };

    this.mostrarFormularioCompetencia = true;
  }

  eliminarCompetencia(id: number): void {
    const confirmar = confirm('¿Deseas eliminar esta competencia?');

    if (confirmar) {
      this.competencias = this.competencias.filter(
        competencia => competencia.id !== id
      );

      localStorage.setItem(
        'competencias',
        JSON.stringify(this.competencias)
      );
    }
  }

  
  // =====================================
  // ASIGNACIONES
  // =====================================

  columnasAsignaciones: string[] = [
    'instructor',
    'competencia',
    'acciones'
  ];

  asignaciones: any[] = [];

  nuevaAsignacion = {
    instructorId: 0,
    competenciaId: 0
  };

  guardarAsignacion(): void {

    if (
      this.nuevaAsignacion.instructorId === 0 ||
      this.nuevaAsignacion.competenciaId === 0
    ) {
      alert('Selecciona un instructor y una competencia.');
      return;
    }

    // Buscar instructor seleccionado
    const instructor = this.instructores.find(
      i => i.id === this.nuevaAsignacion.instructorId
    );

    // Buscar competencia seleccionada
    const competencia = this.competencias.find(
      c => c.id === this.nuevaAsignacion.competenciaId
    );

    if (!instructor || !competencia) {
      alert('El instructor o la competencia seleccionada no existe.');
      return;
    }

    // Evitar asignaciones duplicadas
    const existe = this.asignaciones.some(
      a =>
        a.instructorId === instructor.id &&
        a.competenciaId === competencia.id
    );

    if (existe) {
      alert('Esta asignación ya existe.');
      return;
    }

    // Crear asignación
    const asignacion = {
      instructorId: instructor.id,
      instructorNombre: instructor.nombre,
      competenciaId: competencia.id,
      competenciaNombre: competencia.nombre
    };

    this.asignaciones = [...this.asignaciones, asignacion];

    localStorage.setItem(
      'asignaciones',
      JSON.stringify(this.asignaciones)
    );

    // Limpiar los combos
    this.nuevaAsignacion = {
      instructorId: 0,
      competenciaId: 0
    };
  }

  eliminarAsignacion(instructorId: number, competenciaId: number): void {

    const confirmar = confirm('¿Deseas eliminar esta asignación?');

    if (confirmar) {
      this.asignaciones = this.asignaciones.filter(
        a =>
          !(a.instructorId === instructorId &&
            a.competenciaId === competenciaId)
      );

      localStorage.setItem(
        'asignaciones',
        JSON.stringify(this.asignaciones)
      );
    }
  }

  // =====================================
// FICHAS TITULADAS
// =====================================

  columnasFichas: string[] = [
    'id',
    'programa',
    'jornada',
    'instructorLider',
    'ambiente',
    'fechaInicio',
    'fechaFin',
    'acciones'
  ];

  fichas: any[] = [];

  mostrarFormularioFicha = false;
  fichaEditando: number | null = null;

  nuevaFicha: any = {
    id: 0,
    programa: '',
    jornada: '',
    instructorLiderId: 0,
    instructorLiderNombre: '',
    ambiente: '',
    fechaInicio: null,
    fechaFin: null
  };

  // Opciones para los combos
  programasFicha: string[] = [
    'Análisis y Desarrollo de Software',
    'Gestión Empresarial',
    'Contabilidad'
  ];

  jornadasFicha: string[] = [
    'Mañana',
    'Tarde',
    'Noche',
    'Mixta'
  ];

  // Abrir formulario para registrar
  abrirNuevaFicha(): void {
    this.nuevaFicha = {
      id: this.fichas.length > 0
        ? Math.max(...this.fichas.map(f => f.id)) + 1
        : 1,
      programa: '',
      jornada: '',
      instructorLiderId: 0,
      instructorLiderNombre: '',
      ambiente: '',
      fechaInicio: null,
      fechaFin: null
    };

    this.fichaEditando = null;
    this.mostrarFormularioFicha = true;
  }

  // Guardar o actualizar ficha
  guardarFicha(): void {
    if (
      !this.nuevaFicha.id ||
      !this.nuevaFicha.programa ||
      !this.nuevaFicha.jornada ||
      !this.nuevaFicha.instructorLiderId ||
      !this.nuevaFicha.ambiente ||
      !this.nuevaFicha.fechaInicio ||
      !this.nuevaFicha.fechaFin
    ) {
      alert('Completa todos los campos de la ficha.');
      return;
    }

    if (this.nuevaFicha.fechaFin < this.nuevaFicha.fechaInicio) {
      alert('La fecha fin no puede ser anterior a la fecha inicio.');
      return;
    }

    const instructor = this.instructores.find(
      i => i.id === this.nuevaFicha.instructorLiderId
    );

    if (!instructor) {
      alert('Selecciona un instructor líder válido.');
      return;
    }

    this.nuevaFicha.instructorLiderNombre = instructor.nombre;

    if (this.fichaEditando !== null) {
      // Actualizar
      this.fichas = this.fichas.map(f =>
        f.id === this.fichaEditando
          ? { ...this.nuevaFicha }
          : f
      );
    } else {
      // Evitar fichas con el mismo ID
      const existe = this.fichas.some(
        f => f.id === this.nuevaFicha.id
      );

      if (existe) {
        alert('Ya existe una ficha con ese número.');
        return;
      }

      // Registrar
      this.fichas = [
        ...this.fichas,
        { ...this.nuevaFicha }
      ];
    }

    localStorage.setItem('fichas', JSON.stringify(this.fichas));

    this.mostrarFormularioFicha = false;
    this.fichaEditando = null;
  }

  // Editar ficha
  editarFicha(ficha: any): void {
    this.nuevaFicha = {
      ...ficha,
      fechaInicio: ficha.fechaInicio
        ? new Date(ficha.fechaInicio)
        : null,
      fechaFin: ficha.fechaFin
        ? new Date(ficha.fechaFin)
        : null
    };

    this.fichaEditando = ficha.id;
    this.mostrarFormularioFicha = true;
  }

  // Eliminar ficha
  eliminarFicha(id: number): void {
    const confirmar = confirm('¿Deseas eliminar esta ficha?');

    if (confirmar) {
      this.fichas = this.fichas.filter(f => f.id !== id);

      localStorage.setItem('fichas', JSON.stringify(this.fichas));
    }
  }
  ambientes: any[] = [
    { id: 1, nombre: 'Ambiente 101' },
    { id: 2, nombre: 'Ambiente 102' },
    { id: 3, nombre: 'Ambiente 103' },
    { id: 4, nombre: 'Laboratorio de sistemas' }
  ];
}
