import moment from 'moment'
import { merge } from 'lodash'
import { exportBase } from './base'

const origin = exportBase()

const traduccion = merge(origin, {
  pre_login: {
    subtitle: 'Ingresa a tu cuenta y encuentra el trabajo que buscas',
  },
  login: {
    title: 'Ingresa a tu cuenta',
  },
  registro: {
    title: 'Ingresa tus datos',
    form: {
      label_repertir_password: 'Repite tu contraseña',
    },
    success: {
      subtitle: 'Activa tu cuenta y empieza a postularte',
    },
  },
  mis_postulaciones: {
    order: 'Ordenar por: ',
    title: '¿Quieres recibir novedades de tus postulaciones?',
    button_loading_more: 'Ver más',
    empty_list: 'Aún no te postulaste. ¿Qué estás esperando?',
    fecha_revision: fecha => (fecha === 0 ? 'Hoy ' : `Hace ${fecha} Dias`),
    salario: 'Sueldo bruto pretendido',
    salario_empty: 'No especificado ',
  },
  curriculum: {
    datos_personales: {
      edad: fechaNacimiento => `${moment().diff(moment(fechaNacimiento, 'DD-MM-YYYY'), 'years')} años `,
      dni: dni => ` - ${dni}`,
      civil: estadoCivil => ` - ${estadoCivil}`,
    },
    edit_datos_personales: {
      fecha_nacimiento_placeholder: 'Elige una fecha',
      select_option: 'Elige una opción',
    },
    datos_contacto: {
      telefono_empty: 'Agrega tu teléfono',
      direccion_empty: 'Agrega tu dirección',
    },
    edit_datos_contacto: {
      select_option: 'Elige una opción',
    },
    video: {
      title_part1: 'Para grabar o ver el video que grabaste, entra ',
      title_part2: 'aquí.',
    },
    salario: {
      salario: salario => (salario ? `$${salario} bruto` : `Ingresa tu sueldo bruto pretendido`),
      title_edit: 'Ingresa tu sueldo bruto pretendido',
    },
    objetivo: {
      title: 'Objetivo laboral',
      empty: 'Agrega tu objetivo laboral',
      warning: '¿Quieres eliminar tu objetivo laboral? ',
    },
    pda: {
      error_resumen: 'Por el momento, tu resultado no está disponible. Vuelve a intentarlo más tarde.',
      new: 'Nuevo',
    },
    referencia_laboral: {
      button_requered_laboral: 'Para sumar una referencia laboral, agrega primero una experiencia.',
      warning: '¿Quieres eliminar tu referencia laboral?',
      edit_form: {
        select_option: 'Elige una opción',
      },
    },
    referencia_estudio: {
      warning_delete: '¿Quieres eliminar tu referencia académica?',
      button_requered_estudio: 'Para sumar una referencia académica, agrega primero un estudio. ',
      edit_form: {
        select_option: 'Elige una opción',
      },
    },
    idiomas: {
      warning: '¿Quieres eliminar tu idioma? ',
      select_option: 'Elige una opción',
    },
    experiencia: {
      form_edit: {
        fecha_placeholder: 'Elige una fecha',
        presente: 'Actualmente trabajo aquí',
        nivel_experiencia: 'Nivel de experiencia',
        select_option: 'Elige una opción',
        warning: '¿Quieres eliminar tu experiencia laboral?',
      },
    },
    estudios: {
      warning_delete: '¿Quieres eliminar tu formación académica?',
      form_edit: {
        fecha_placeholder: 'Elige una fecha',
        select_option: 'Elige una opción',
      },
    },
    skills: {
      title: 'Conocimientos y habilidades',
      text: 'Próximamente, podrás visualizar y agregar tus conocimientos y habilidades.',
      empty: 'No agregaste un skill',
      button_create: 'Sumar conocimiento',
    },
    ajustes: {
      notificaciones: {
        subtitle: 'Gestiona la recepción de emails.',
        edit: {
          warning_alertas:
            'Aún no tienes alertas guardadas. Para recibir ofertas de trabajo por email, crea alertas después de realizar una búsqueda.',
          title_alertas: 'Alertas',
          envios: {
            text: 'Envío semanal de ofertas laborales que se relacionan con tus búsquedas y tu CV. ',
          },
          actividad: {
            text: 'Envío mensual de la actividad entre las empresas y tu CV.',
          },
          especiales: {
            text: 'Envío de avisos en los que tienes mayores posibilidades. ',
          },
        },
      },
      cuenta: {
        subtitle: 'Modifica la privacidad de tu CV, cambia la contraseña o elimina tu cuenta. ',
        perfil: {
          change_password_subtitle: 'Modifica tu contraseña actual por una nueva.',
          repetir: 'Repite tu nueva contraseña',
          privacidad_title: 'Privacidad de mi CV',
          privacidad_privado: 'Tu CV es visible únicamente en los avisos a los que te postulaste.',
          privacidad_publico:
            'Tu CV es visible en los avisos a los que te postulaste y en otras búsquedas que realizan las empresas. ',
          delete_subtitle:
            'Si eliminas tu cuenta de Laborum, no podrás postularte a más ofertas de trabajo ni revisar tus postulaciones.',
          delete_optional: '¿Por qué quieres eliminar tu cuenta?(Opcional)',
          delete_button_subtmin: 'Eliminar cuenta',
          warning_delete: '¿Quieres eliminar tu cuenta?',
        },
      },
      session: {
        warning: '¿Quieres cerrar tu sesión? ',
      },
    },
  },
  listado_avisos: {
    button_load_more: 'Ver más trabajos',
    empty_list: {
      subtitle: 'Prueba con otras palabras o reduce los filtros aplicados.',
    },
  },
  ficha_aviso: {
    button_postulado: date => `Postulado el ${date}`,
    areas: 'Area : ',
    tipo_de_puesto: 'Tipo de puesto : ',
    label_salario: 'Ingresa tu sueldo bruto pretendido',
    pregunta: {
      title: 'Esta empresa quiere saber un poco más de ti',
      button_submit: 'Contestar y postularme',
      modal: {
        title: 'Preguntas',
      },
    },
    carta_presentacion: {
      subtitle: 'Aumenta las chances de que te elijan ',
      bajada:
        'Escribe una carta de postulación contando por qué serías ideal para este puesto. Es opcional, ¡pero suma mucho! ',
      title_recomendados: 'Conocé más trabajos para vos',
      button_aviso: 'Ir al aviso',
      text_result_success: '¡Ya enviamos tu carta de postulación!',
      text_result_skip: 'En tu próxima postulación, completá la carta y aprovechá para lucirte',
    },
  },
  mensajes: {
    chat: {
      placeholder: 'Escribe tu mensaje',
    },
    empty: 'Aquí te aparecerán los mensajes de las empresas o reclutadores. ',
  },
  button: {
    button_enterokay: 'Ingresar',
    button_postular: 'Postularme',
    button_buscar: 'Buscar',
    button_create: 'Guardar',
    button_delete: 'Eliminar',
    button_cancel: 'Cancelar',
    si: 'Sí',
    no: 'No',
  },
  error_pages: {
    subtitle_conexion: 'Revisa tu conexión a internet y vuelve. ¡Te esperamos!',
  },
  validation: {
    campos_obligatorio: 'Campos obligatorios ',
    error_nombre: 'Ingresa tu nombre.',
    error_apellido: 'Ingresa tu apellido.',
    error_fecha_nacimiento: 'Ingresa tu fecha de nacimiento.',
    error_nacionalidad: 'Ingresa tu nacionalidad.',
    error_genero: 'Ingresa tu género.',
    error_civil: 'Ingresa tu estado civil.',
    error_tipo_documento: 'Ingresa tu tipo de documento.',
    error_documento: 'Ingresa tu número de documento.',
    error_email: 'Ingresa tu email.',
    error_telefono: 'Ingresa tu teléfono.',
    error_pais_residencia: 'Ingresa tu país de residencia.',
    error_provincia: 'Ingresa tu provincia.',
    error_localidad: 'Ingresa tu localidad.',
    error_direccion: 'Ingresa tu dirección.',
    error_validate_email: 'Ingresa un email válido.',
    error_password: 'Ingresa una contraseña.',
    error_password_login: 'Ingresa tu contraseña.',
    error_repeat_password: 'Vuelve a ingresar la contraseña.',
    error_password_not_match: 'Las contraseñas no coinciden.',
    error_user: 'Ingresa tu email o usuario.',
    error_authentication: 'Revisa tu usuario o contraseña.',
    error_empresa: 'Ingresa el nombre de la empresa.',
    error_puesto: 'Ingresa tu puesto.',
    error_fecha_inicio: 'Ingresa la fecha de inicio.',
    error_fecha_fin: 'Ingresa la fecha de finalización.',
    error_fecha_min_fin: 'La fecha de finalización es menor a la de inicio.',
    error_experiencia: 'Ingresa tu nivel de experiencia.',
    error_pais: 'Ingresa el país.',
    error_area_puesto: 'Ingresa el área del puesto.',
    error_subarea_puesto: 'Ingresa la subárea del puesto.',
    error_actividad_empresa: 'Ingresa la actividad de la empresa.',
    error_resposabilidad: 'Escribe una descripción de tus responsabilidades.',
    error_un_nombre: 'Ingresa un nombre.',
    error_un_apellido: 'Ingresa un apellido.',
    error_un_email: 'Ingresa un email.',
    error_un_telefono: 'Ingresa un teléfono.',
    error_relacion: 'Ingresa la relación con tu referencia.',
    error_experiencia_relacion: 'Ingresa la experiencia relacionada con tu referencia.',
    error_carrera: 'Ingresa tu título o carrera.',
    error_nombre_institucion: 'Ingresa el nombre de la institución.',
    error_area_estudio: 'Ingresa el área de estudio.',
    error_tipo_estudio: 'Ingresa el tipo de estudio.',
    error_estado_estudio: 'Ingresa el estado de estudio.',
    error_institucion: 'Ingresa el nombre de la institución.',
    error_salario: 'Ingresa un sueldo.',
    error_objetivo_laboral: 'Escribe tu objetivo laboral.',
    error_field_requered: 'El campo es requerido',
    error_min_characters: number => `Ingresa al menos ${number} caracteres.`,
    error_idiomas: 'Ingresa un idioma.',
    error_idiomas_escrito: 'Ingresa el nivel escrito.',
    error_idiomas_oral: 'Ingresa el nivel oral.',
    error_carta_presentacion: 'Completá la carta para poder enviarla',
    fecha_min: `La fecha de fin es menor a la de inicio.`,
    error_new_password: 'Ingresa tu nueva contraseña.',
    error_old_password: 'Ingresa tu contraseña actual.',
    error_request: 'No pudimos completar tu solicitud.',
    error_preguntas: 'Completa este campo.',
    error_preguntas_choice: 'Elige una opción.',
  },
  response: {
    success_request_delete: 'Se borro exitosamente',
    save_request: 'Se guardo exitosamente',
  },
})

export default traduccion
