// pf/index.js
// Programación funcional para encuestas

let encuestas = [];
let encuestaId = 0;
let preguntaId = 0;
let respuestaId = 0;

// Crear encuesta
export const crearEncuesta = (titulo) => ({
    id: ++encuestaId,
    titulo,
    preguntas: []
});

// Agregar pregunta a una encuesta existente
export const agregarPregunta = (encuesta, tituloPregunta) => {
    const nuevaPregunta = {
        id: ++preguntaId,
        titulo: tituloPregunta,
        respuestas: []
    };
    return {
        ...encuesta,
        preguntas: [...encuesta.preguntas, nuevaPregunta]
    };
};

// Agregar respuesta a una pregunta específica por índice en la encuesta
export const agregarRespuestaAEncuesta = (encuesta, preguntaIndex, textoRespuesta) => {
    const pregunta = encuesta.preguntas[preguntaIndex];
    if (!pregunta) return encuesta;

    const nuevaPregunta = {
        ...pregunta,
        respuestas: [...(pregunta.respuestas || []), {
            id: ++respuestaId,
            texto: textoRespuesta,
            conteo: 0
        }]
    };

    const preguntasActualizadas = encuesta.preguntas.map((p, i) =>
        i === preguntaIndex ? nuevaPregunta : p
    );

    return {
        ...encuesta,
        preguntas: preguntasActualizadas
    };
};

// Votar por una respuesta en una pregunta
export const votar = (encuesta, preguntaIndex, respuestaIndex) => {
    const pregunta = encuesta.preguntas[preguntaIndex];
    if (!pregunta) return encuesta;

    const nuevasRespuestas = (pregunta.respuestas || []).map((r, i) =>
        i === respuestaIndex ? { ...r, conteo: r.conteo + 1 } : r
    );

    const nuevaPregunta = {
        ...pregunta,
        respuestas: nuevasRespuestas
    };

    const preguntasActualizadas = encuesta.preguntas.map((p, i) =>
        i === preguntaIndex ? nuevaPregunta : p
    );

    return {
        ...encuesta,
        preguntas: preguntasActualizadas
    };
};

// Obtener resumen de una encuesta
export const resumenEncuesta = (encuesta) => {
    return `Resumen de la encuesta: "${encuesta.titulo}"

` +
        encuesta.preguntas.map((p, i) => {
            return `Pregunta ${i + 1}: ${p.titulo}\n` +
                (p.respuestas || []).map(r => `  - ${r.texto}: ${r.conteo} voto(s)`).join("\n");
        }).join("\n\n");
};

// Registro global de encuestas
export const registrarEncuesta = (encuesta) => {
    encuestas = [...encuestas, encuesta];
};

export const listarEncuestas = () => encuestas;

export const buscarEncuestaPorId = (id) => encuestas.find(e => e.id === id);

export const generarResumen = resumenEncuesta;
