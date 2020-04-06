export const fichaAvisoMock = {
  fechaPostulacion: null,
  estadoPostulacion: null,
  aviso: {
    fechaPublicacion: '01-07-2019',
    fechaFinalizacion: '31-07-2019',
    estado: 'activo',
    titulo: 'Aviso con preguntas y requisito',
    descripcion: 'Desc',
    aptoDiscapacitados: false,
    cantidadVacantes: 1,
    empresa: {
      denominacion: 'Edenor',
      logoURL:
        'http://imgbum.prepro.jobscdn.com/portal/img/empresas/0/0/0/0/0/0/8/3/7/0/logoMainPic_8370_bum_v7b44c29c.jpg',
      confidencial: false,
      id: 8370,
    },
    localizacion: {
      paisId: 1,
      zonaId: 1,
      provinciaId: 29,
      localidadId: 7,
      direccion: null,
      detalle: 'Capital Federal, Buenos Aires, Argentina',
      id: 7,
    },
    area: {
      id: 3,
      nombre: 'Abastecimiento y Logística',
    },
    subArea: {
      id: 54,
      nombre: 'Distribución',
    },
    preguntas: [
      {
        simple: {
          id: 29552586,
          texto: '¿Cuál es tu expectativa salarial neta para un cambio?',
        },
      },
      {
        simple: {
          id: 29552587,
          texto: 'Esta es una pregunta abierta ?',
        },
      },
      {
        choice: {
          id: 29552588,
          texto: 'Esta es una pregunta multiple choise ?',
          indiceCorrecta: 0,
          opciones: [
            {
              id: 1000930154,
              opcion: 'Si',
            },
            {
              id: 1000930155,
              opcion: 'No',
            },
          ],
        },
      },
    ],
    tipoTrabajo: {
      id: 2,
      nombre: 'Full-time',
    },
    planPublicacion: {
      id: 70,
      nombre: 'Simples',
    },
    videoUrl: 'vimeo.com/29623840',
    nivelLaboral: {
      nombre: 'Senior / Semi-Senior',
      id: 1,
    },
    redireccionURL: null,
    origenAviso: 'PORTAL',
    puesto: {
      puestoId: null,
      nombre: null,
      tieneEstadisticas: false,
    },
    id: 1113410719,
    productoLookAndFeel: {
      colorTituloAviso: '#000000',
      colorTituloEmpresa: '#000000',
      colorTexto: '#000000',
      colorLabels: '#000000',
      colorBackgroundSeparadores: '#000000',
      colorTextoSeparadores: '#000000',
      colorBackgroundBotones: '#562567',
      colorTextoBotones: '#FFFFFF',
      colorBackgroundTituloCaja: '#762b85',
      colorTextoTituloCaja: '#FFFFFF',
      colorBackgroundCaja: '#000000',
      colorSeparadoresCaja: '#000000',
      colorBordeCaja: '#562567',
      colorTextoCaja: '#000000',
      bannerEmpresa: 'http://imgbum.prepro.jobscdn.com/postulantes/custom/bg_10113775.png',
    },
  },
}
