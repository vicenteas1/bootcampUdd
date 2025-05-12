class GlobalParams {
    static surveyId    = 0;
    static questionId  = 0;
    static answerId    = 0;
}

class ApiResponse {
    constructor({ message = "", data = null, statusCode = 400 }) {
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }

    getMessage() {
        return this.message;
    }
    setMessage(message) {
        this.message = message;
        return this.message;
    }

    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
        return this.data;
    }

    getStatusCode() {
        return this.statusCode;
    }
    setStatusCode(statusCode) {
        this.statusCode = statusCode;
        return this.statusCode;
    }

    toString() {
        return `StatusCode: ${this.getStatusCode()}, Message: "${this.getMessage()}", Data: ${JSON.stringify(
            this.getData()
        )}`;
    }
}

class Orquestator {
    constructor() {
        this.surveys = [];
    }

    createSurvey(title) {
        try {
            const survey = new Encuesta(title);
            this.surveys.push(survey);

            return new ApiResponse({
                message: `Encuesta creada satisfactoriamente.`,
                data: survey,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: `Error al crear encuesta.`,
                data: error.message || error,
                statusCode: 400
            });   
        }  
    }

    updateSurvey(surveyId, title) {
        try {
            const index = this.surveys.findIndex(element => element.surveyId === surveyId);

            if (index === -1) {
                return new ApiResponse({
                    message: `No se encontró la pregunta con ID ${surveyId}.`,
                    data: null,
                    statusCode: 404
                });
            };

            const survey = this.surveys[index];
            survey.setTitle(title);

            return new ApiResponse({
                message: `Pregunta con ID ${survey.getSurveyId()} actualizada correctamente.`,
                data: survey,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: `Error al actualizar pregunta.`,
                data: error.message || error,
                statusCode: 400
            });   
        }
    }

    deleteSurvey(surveyId) {
        try {
            const index = this.surveys.findIndex(element => element.surveyId === surveyId);
    
            if (index === -1) {
                return new ApiResponse({
                    message: `No se encontró la encuesta con ID ${surveyId}.`,
                    data: null,
                    statusCode: 404
                });
            };
    
            const eliminada = this.surveys.splice(index, 1)[0];
    
            return new ApiResponse({
                message: `encuesta con ID ${surveyId} eliminada correctamente.`,
                data: eliminada,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: `Error al eliminar pregunta.`,
                data: error.message || error,
                statusCode: 400
            });   
        }
    }

    listSurveys() {
        try {
            return new ApiResponse({
                message: `Lista de encuestas.`,
                data: this.surveys,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: `Error al listar encuestas.`,
                data: error.message || error,
                statusCode: 400
            });   
        }
    }
}

class Encuesta {
    constructor(title, questions = []){
        this.surveyId   = ++GlobalParams.surveyId;
        this.questions  = questions;
        this.title      = title;
    }

    getSurveyId() {
        return this.surveyId;
    }

    getTitle() {
        return this.title;
    }
    setTitle(title) {
        if (typeof title !== 'string' || title == '') {
            return 'Error: título inválido';
        }
        this.title = title;
        return title;
    }

    createQuestion(title) {
        try {
            const question = new Pregunta(this.surveyId, title);
            this.questions.push(question);

            return new ApiResponse({
                message: `Pregunta creada satisfactoriamente.`,
                data: question,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: `Error al crear pregunta.`,
                data: error.message || error,
                statusCode: 400
            });   
        }
    }

    updateQuestion(questionId, text) {
        try {
            const index = this.questions.findIndex(element => element.questionId === questionId);

            if (index === -1) {
                return new ApiResponse({
                    message: `No se encontró la pregunta con ID ${questionId}.`,
                    data: null,
                    statusCode: 404
                });
            };

            const question = this.questions[index];
            question.setTitle(text);

            return new ApiResponse({
                message: `Pregunta con ID ${question.getQuestionId()} actualizada correctamente.`,
                data: question,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: `Error al actualizar pregunta.`,
                data: error.message || error,
                statusCode: 400
            });   
        }
    }

    deleteQuestion(questionId) {
        try {
            const index = this.questions.findIndex(element => element.questionId === questionId);
    
            if (index === -1) {
                return new ApiResponse({
                    message: `No se encontró la pregunta con ID ${questionId}.`,
                    data: null,
                    statusCode: 404
                });
            };
    
            const eliminada = this.questions.splice(index, 1)[0];
    
            return new ApiResponse({
                message: `Pregunta con ID ${questionId} eliminada correctamente.`,
                data: eliminada,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: `Error al eliminar pregunta.`,
                data: error.message || error,
                statusCode: 400
            });   
        }
    }

    listQuestions() {
        try {
            return new ApiResponse({
                message: `Preguntas para la encuesta con id: ${this.getSurveyId()}.`,
                data: this.questions,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: `Error al listar preguntas.`,
                data: error.message || error,
                statusCode: 400
            });   
        }
    }

    showSurveyInfo() {
        try {
            return new ApiResponse({
                message: `Informacion de la encuesta.`,
                data: this,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: `Error al mostrar información de la encuesta.`,
                data: error.message || error,
                statusCode: 400
            });   
        }
    }
}

class Pregunta {
    constructor(surveyId, title, answers = [], status = 1) {
        this.surveyId = surveyId;
        this.questionId = ++GlobalParams.questionId;
        this.title = title;
        this.answers = answers;
        this.status = status;
    }

    getSurveyId() {
        return this.surveyId;
    }
    setSurveyId(surveyId) {
        if (typeof surveyId !== 'number' || surveyId <= 0 || isNaN(surveyId)) {
            return 'Error: surveyId inválido';
        }
        this.surveyId = surveyId;
        return surveyId;
    }

    getQuestionId() {
        return this.questionId;
    }

    getTitle() {
        return this.title;
    }
    setTitle(title) {
        if (typeof title !== 'string' || title == '') {
            return 'Error: título inválido';
        }
        this.title = title;
        return title;
    }

    getAnswers() {
        return this.answers;
    }
    setAnswers(answers) {
        if (!Array.isArray(answers)) {
            return 'Error: answers debe ser un arreglo';
        }
        this.answers = answers.map(text => new Respuesta(this.questionId, text));
        return this.answers;
    }

    getStatus() {
        return this.status;
    }
    setStatus(status) {
        if (status !== 0 && status !== 1) {
            return 'Error: status debe ser 0 o 1';
        }
        this.status = status;
        return status;
    }

    createAnswer(text){
        try {
            const answer = new Respuesta(this.questionId, text);
            this.answers.push(answer);

            return new ApiResponse({
                message: `Respuesta creada satisfactoriamente.`,
                data: answer,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: `Error al crearrespuesta: ${error}.`,
                data: answer,
                statusCode: 400
            });
        }
    }

    updateAnswer(answerId, text) {
        try {
            const index = this.answers.findIndex(element => element.answerId === answerId);

            if (index === -1) {
                return new ApiResponse({
                    message: `No se encontró la respuesta con ID ${answerId}.`,
                    data: null,
                    statusCode: 404
                });
            };

            const answer = this.answers[index];
            answer.setText(text);

            return new ApiResponse({
                message: `Respuesta con ID ${answer.getAnswerId()} actualizada correctamente.`,
                data: answer,
                statusCode: 200
            });

        } catch (error) {
            return new ApiResponse({
                message: `Error al actualizar respuesta.`,
                data: error.message || error,
                statusCode: 400
            });
        }
    }

    deleteAnswer(answerId) {
        try {
            const index = this.answers.findIndex(element => element.answerId === answerId);
    
            if (index === -1) {
                return new ApiResponse({
                    message: `No se encontró la respuesta con ID ${answerId}.`,
                    data: null,
                    statusCode: 404
                });
            };
    
            const eliminada = this.answers.splice(index, 1)[0];
    
            return new ApiResponse({
                message: `Respuesta con ID ${answerId} eliminada correctamente.`,
                data: eliminada,
                statusCode: 200
            });
    
        } catch (error) {
            return new ApiResponse({
                message: `Error al eliminar respuesta.`,
                data: error.message || error,
                statusCode: 400
            });
        }
    }

    listAnswers(){
        try {
            return new ApiResponse({
                message: `Respuestas para la pregunta con id: ${this.getQuestionId()}.`,
                data: this.answers,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: `Error al listar respuestas.`,
                data: error.message || error,
                statusCode: 400
            });
        }
    }

    showQuestionInfo(){
        try {
            return new ApiResponse({
                message: `Informacion de la pregunta.`,
                data: this,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: `Error al mostrar información de la pregunta.`,
                data: error.message || error,
                statusCode: 400
            });   
        }
    }
}

class Respuesta {
    constructor(questionId, text, status = 1 /*, selected = 0*/){
        this.questionId = questionId;
        this.answerId   = ++GlobalParams.answerId;
        this.text       = text;
        this.status     = status;
        //this.selected   = selected;
        this.conteo     = 0;
    }

    getQuestionId(){
        return this.questionId;
    }
    setQuestionId(questionId){
        if (typeof questionId !== 'number' || isNaN(questionId) || questionId < 0) {
            return 'Error: Valor questionId no valido';
        }
        this.questionId = questionId;
        return questionId;
    }  

    getAnswerId(){
        return this.answerId;
    }

    getText(){
        return this.text;
    }
    setText(text){
        if (typeof text !== 'string') {
            return 'Error: Valor text no valido';
        }
        this.text = text;
        return text;
    }

    getStatus(){
        return this.status;
    }
    setStatus(status){
        if (typeof status !== 'number' || isNaN(status) || status < 0 || status > 1) {
            return 'Error: Valor status no valido';
        }
        this.status = status;
        return status;
    }

    // getSelected(){
    //     return this.selected;
    // }
    // setSelected(selected){
    //     if (typeof selected !== 'number' || isNaN(selected) || selected < 0 || selected > 1) {
    //         return 'Error: Valor selected no valido';
    //     }
    //     this.selected = selected;
    //     return selected;
    // }

    addVote(){
        try {
            this.conteo++; 
            return new ApiResponse({
                message: `Voto agregado correctamente.`,
                data: this,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: 'Error al agregar voto.',
                data: error.message || error,
                statusCode: 400
            }); 
        }
    }

    quitVote(){
        try {
            if(this.conteo > 0){
                this.conteo--; 
            }

            return new ApiResponse({
                message: `Voto eliminado correctamente.`,
                data: this,
                statusCode: 200
            });
        } catch (error) {
            return new ApiResponse({
                message: 'Error al eliminar voto.',
                data: error.message || error,
                statusCode: 400
            }); 
        }
    }

    showAnswerInfo(){
        return new ApiResponse({
            message: `Informacion de la respuesta.`,
            data: this,
            statusCode: 200
        });
    }
}

const orquestator = new Orquestator();


/**Encuestas */
export function surveyManagement() {
    management();

    function management() {
        alert("Bienvenido al gestor de encuestas BOOTCAMP UDD");
        let salir = false;

        while (!salir) {
            try {
                let operation = parseInt(prompt(
                    "Introduce el número de la operación a realizar: \n" + 
                    "1: Crear encuesta\n" + 
                    "2: Actualizar titulo encuesta\n" + 
                    "3: Eliminar encuesta\n" + 
                    "4: Listar encuestas\n" + 
                    "5: Salir"));
                
                switch (operation) {
                    case 1:
                        createSurvey();
                        break;

                    case 2:
                        updateSurvey();
                        break;

                    case 3:
                        deleteSurvey();
                        break;

                    case 4:
                        listSurveys();
                        break;

                    case 5:
                        salir = true;
                        alert("¡Hasta luego!");
                        break;

                    default:
                        alert("Error, operación no valida. Eliga una operación válida porfavor.");
                        break;
                }
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        }
    }

    function createSurvey() {
        const surveyId = GlobalParams.surveyId + 1
        alert(`Se creará la encuesta con id: ${surveyId}`);
    
        const tituloEncuesta = prompt(`Ingrese el titulo de la encuesta con ID: ${surveyId}`);
        const response = orquestator.createSurvey(tituloEncuesta);
        if (response.statusCode === 200) {
            const responseMessage = response.getMessage();
            const responseData = response.getData().getTitle();
            alert(`${responseMessage}\n Titulo encuesta: ${responseData}`);
        }
    }
    
    function listSurveys() {    
        const response = orquestator.listSurveys();
        if (response.statusCode === 200) {
            const surveys = response.getData();
            const cantidad = surveys.length;
    
            if (cantidad === 0) {
                alert("No hay encuestas creadas.");
                return;
            }
    
            const lista = surveys.map(s => `ID encuesta: ${s.surveyId}, Título: ${s.title}`).join('\n');
            alert(`Cantidad de encuestas: ${cantidad}\n\n${lista}`);
        } else {
            alert(`Error al listar encuestas: ${response.getMessage()}`);
        }
    }

    function updateSurvey() {
        const responseLs = orquestator.listSurveys();
        console.log(responseLs);
        if (responseLs.statusCode !== 200) {
            alert("Error al obtener encuestas.");
            return;
        }
    
        const surveys = responseLs.getData();
    
        if (surveys.length === 0) {
            alert("No hay encuestas disponibles para seleccionar.");
            return;
        }

        const lista = surveys.map(s => `ID encuesta: ${s.surveyId}, Título: ${s.title}`).join('\n');

        const surveyIdToUpdate = parseInt(prompt(`Ingrese ID de la encuesta a actualizar.\n${lista}`));

        const surveyExist = surveys.find(element => element.getSurveyId() === surveyIdToUpdate);
        if (!surveyExist) {
            alert("Ingrese un ID válido.");
            return updateSurvey();
        }
    
        const tituloEncuesta = prompt(`Ingrese el nuevo titulo de la encuesta con ID: ${surveyIdToUpdate}`);
        const response = orquestator.updateSurvey(surveyIdToUpdate, tituloEncuesta);
        if (response.statusCode === 200) {
            const responseMessage = response.getMessage();
            const responseData = response.getData().getTitle();
            alert(`${responseMessage}\n Nuevo titulo encuesta: ${responseData}`);
        }
    }
    
    function deleteSurvey() {
        const responseLs = orquestator.listSurveys();
        if (responseLs.statusCode !== 200) {
            alert("Error al obtener encuestas.");
            return;
        }
    
        const surveys = responseLs.getData();
    
        if (surveys.length === 0) {
            alert("No hay encuestas disponibles para seleccionar.");
            return;
        }

        const lista = surveys.map(s => `ID encuesta: ${s.surveyId}, Título: ${s.title}`).join('\n');

        const surveyIdToDelete = parseInt(prompt(`Ingrese ID de la encuesta a eliminar.\n${lista}`));

        const surveyExist = surveys.find(element => element.getSurveyId() === surveyIdToDelete);
        if (!surveyExist) {
            alert("Ingrese un ID válido.");
            return deleteSurvey();
        }
    
        const response = orquestator.deleteSurvey(surveyIdToDelete);
        if (response.statusCode === 200) {
            const responseMessage = response.getMessage();
            alert(`${responseMessage}`);        }
    }
}

/**Preguntas */
export function questionManagement() {
    management();

    function management() {
        alert("Bienvenido al gestor de preguntas BOOTCAMP UDD");

        const selectedSurvey = selectSurvey();
        if (!selectedSurvey) return;

        let salir = false;

        while (!salir) {
            const op = parseInt(prompt(
                `Operaciones para la encuesta "${selectedSurvey.getTitle()}":\n` +
                "1. Agregar pregunta\n" +
                "2. Ver preguntas\n" +
                "3. Actualizar pregunta\n" +
                "4. Eliminar pregunta\n" +
                "5. Salir"
            ));

            switch (op) {
                case 1:
                    createQuestion(selectedSurvey);
                    break;

                case 2:
                    viewQuestions(selectedSurvey);
                    break;

                case 3:
                    updateQuestion(selectedSurvey);
                    break;

                case 4:
                    deleteQuestion(selectedSurvey);
                    break;

                case 5:
                    salir = true;
                    break;

                default:
                    alert("Opción inválida.");
            }
        }
    }

    function selectSurvey() {
        const response = orquestator.listSurveys();

        if (response.statusCode !== 200) {
            alert("Error al obtener encuestas.");
            return null;
        }

        const surveys = response.getData();

        if (surveys.length === 0) {
            alert("No hay encuestas disponibles.");
            return null;
        }

        const lista = surveys.map(s => `ID: ${s.surveyId}, Título: ${s.title}`).join('\n');
        const input = parseInt(prompt(`Encuestas disponibles:\n\n${lista}\n\nIngrese el ID de la encuesta:`));
        const selected = surveys.find(s => s.surveyId === input);

        if (!selected) {
            alert("Encuesta no encontrada.");
            return null;
        }

        alert(`Encuesta seleccionada: "${selected.getTitle()}"`);
        return selected;
    }

    function createQuestion(survey) {
        const title = prompt("Ingrese el texto de la nueva pregunta:");
        const res = survey.createQuestion(title);
        alert(res.getMessage());
    }

    function viewQuestions(survey) {
        const response = survey.listQuestions();
        if (response.statusCode !== 200) {
            alert(`Error al listar preguntas: ${response.getMessage()}`);
            return;
        }
    
        const questions = response.getData();
        const cantidad = questions.length;
    
        if (cantidad === 0) {
            alert("No hay preguntas creadas.");
            return;
        }
    
        const lista = questions.map(q => `ID pregunta: ${q.questionId}, Título: ${q.title}`).join('\n');
        alert(`Cantidad de preguntas: ${cantidad}\n\n${lista}`);
    }

    function updateQuestion(survey) {
        const response = survey.listQuestions();
        if (response.statusCode !== 200) {
            alert("Error al obtener preguntas.");
            return;
        }
    
        const questions = response.getData();
        if (questions.length === 0) {
            alert("No hay preguntas disponibles para actualizar.");
            return;
        }
    
        const lista = questions.map(q => `ID pregunta: ${q.questionId}, Título: ${q.title}`).join('\n');
        const questionIdToUpdate = parseInt(prompt(`Preguntas disponibles:\n\n${lista}\n\nIngrese el ID de la pregunta a actualizar:`));
    
        const questionExist = questions.find(q => q.questionId === questionIdToUpdate);
        if (!questionExist) {
            alert("ID inválido.");
            return updateQuestion(survey);
        }
    
        const nuevoTitulo = prompt(`Ingrese el nuevo título para la pregunta con ID ${questionIdToUpdate}:`);
        const responseUpdate = survey.updateQuestion(questionIdToUpdate, nuevoTitulo);
    
        if (responseUpdate.statusCode === 200) {
            const responseMessage = responseUpdate.getMessage();
            const responseData = responseUpdate.getData().getTitle();
            alert(`${responseMessage}\nNuevo título: ${responseData}`);
        } else {
            alert(`Error al actualizar: ${responseUpdate.getMessage()}`);
        }
    }

    function deleteQuestion(survey) {
        const response = survey.listQuestions();
        if (response.statusCode !== 200) {
            alert("Error al obtener preguntas.");
            return;
        }
    
        const questions = response.getData();
        if (questions.length === 0) {
            alert("No hay preguntas disponibles para eliminar.");
            return;
        }
    
        const lista = questions.map(q => `ID pregunta: ${q.questionId}, Título: ${q.title}`).join('\n');
        const questionIdToDelete = parseInt(prompt(`Preguntas disponibles:\n\n${lista}\n\nIngrese el ID de la pregunta a eliminar:`));
    
        const questionExist = questions.find(q => q.questionId === questionIdToDelete);
        if (!questionExist) {
            alert("ID inválido.");
            return deleteQuestion(survey);
        }
    
        const responseDelete = survey.deleteQuestion(questionIdToDelete);
    
        if (responseDelete.statusCode === 200) {
            const responseMessage = responseDelete.getMessage();
            alert(`${responseMessage}`);
        } else {
            alert(`Error al eliminar: ${responseDelete.getMessage()}`);
        }
    }
}

/**AnswersManagement */
/**AnswersManagement */
export function answerManagement() {
    management();

    function management() {
        alert("Bienvenido al gestor de respuestas BOOTCAMP UDD");

        const selectedSurvey = selectSurvey();
        if (!selectedSurvey) return;

        const selectedQuestion = selectQuestion(selectedSurvey);
        if (!selectedQuestion) return;

        let salir = false;

        while (!salir) {
            const op = parseInt(prompt(
                `Operaciones para la pregunta "${selectedQuestion.getTitle()}":\n` +
                "1. Agregar respuesta\n" +
                "2. Ver respuestas\n" +
                "3. Actualizar respuesta\n" +
                "4. Eliminar respuesta\n" +
                "5. Salir"
            ));

            switch (op) {
                case 1:
                    createAnswer(selectedQuestion);
                    break;
                case 2:
                    listAnswers(selectedQuestion);
                    break;
                case 3:
                    updateAnswer(selectedQuestion);
                    break;
                case 4:
                    deleteAnswer(selectedQuestion);
                    break;
                case 5:
                    salir = true;
                    break;
                default:
                    alert("Opción inválida.");
            }
        }
    }

    function selectSurvey() {
        const response = orquestator.listSurveys();
        if (response.statusCode !== 200) {
            alert("Error al obtener encuestas.");
            return null;
        }

        const surveys = response.getData();
        if (surveys.length === 0) {
            alert("No hay encuestas disponibles.");
            return null;
        }

        const lista = surveys.map(s => `ID: ${s.surveyId}, Título: ${s.title}`).join('\n');
        const id = parseInt(prompt(`Encuestas disponibles:\n\n${lista}\n\nIngrese el ID de la encuesta:`));
        const selected = surveys.find(s => s.surveyId === id);

        if (!selected) {
            alert("Encuesta no encontrada.");
            return null;
        }

        alert(`Encuesta seleccionada: "${selected.getTitle()}"`);
        return selected;
    }

    function selectQuestion(survey) {
        const response = survey.listQuestions();
        if (response.statusCode !== 200) {
            alert("Error al obtener preguntas.");
            return null;
        }

        const questions = response.getData();
        if (questions.length === 0) {
            alert("No hay preguntas disponibles.");
            return null;
        }

        const lista = questions.map(q => `ID: ${q.questionId}, Título: ${q.title}`).join('\n');
        const id = parseInt(prompt(`Preguntas disponibles:\n\n${lista}\n\nIngrese el ID de la pregunta:`));
        const selected = questions.find(q => q.questionId === id);

        if (!selected) {
            alert("Pregunta no encontrada.");
            return null;
        }

        alert(`Pregunta seleccionada: "${selected.getTitle()}"`);
        return selected;
    }

    function createAnswer(question) {
        const text = prompt("Ingrese el texto de la nueva respuesta:");
        const res = question.createAnswer(text);
        alert(res.getMessage());
    }

    function listAnswers(question) {
        const response = question.listAnswers();
        if (response.statusCode !== 200) {
            alert("Error al obtener respuestas.");
            return;
        }

        const answers = response.getData();
        if (answers.length === 0) {
            alert("No hay respuestas registradas.");
            return;
        }

        const lista = answers.map(a => `ID: ${a.answerId}, Texto: ${a.text}`).join('\n');
        alert(`Respuestas registradas:\n\n${lista}`);
    }

    function updateAnswer(question) {
        const response = question.listAnswers();
        if (response.statusCode !== 200) {
            alert("Error al obtener respuestas.");
            return;
        }

        const answers = response.getData();
        if (answers.length === 0) {
            alert("No hay respuestas disponibles.");
            return;
        }

        const lista = answers.map(a => `ID: ${a.answerId}, Texto: ${a.text}`).join('\n');
        const id = parseInt(prompt(`Respuestas disponibles:\n\n${lista}\n\nIngrese el ID de la respuesta a actualizar:`));
        const selected = answers.find(a => a.answerId === id);

        if (!selected) {
            alert("ID inválido.");
            return updateAnswer(question);
        }

        const newText = prompt(`Ingrese el nuevo texto para la respuesta con ID ${id}:`);
        const res = question.updateAnswer(id, newText);

        if (res.statusCode === 200) {
            alert(`${res.getMessage()}\nNuevo texto: ${res.getData().getText()}`);
        } else {
            alert(`Error: ${res.getMessage()}`);
        }
    }

    function deleteAnswer(question) {
        const response = question.listAnswers();
        if (response.statusCode !== 200) {
            alert("Error al obtener respuestas.");
            return;
        }

        const answers = response.getData();
        if (answers.length === 0) {
            alert("No hay respuestas disponibles.");
            return;
        }

        const lista = answers.map(a => `ID: ${a.answerId}, Texto: ${a.text}`).join('\n');
        const id = parseInt(prompt(`Respuestas disponibles:\n\n${lista}\n\nIngrese el ID de la respuesta a eliminar:`));
        const selected = answers.find(a => a.answerId === id);

        if (!selected) {
            alert("ID inválido.");
            return deleteAnswer(question);
        }

        const res = question.deleteAnswer(id);

        if (res.statusCode === 200) {
            alert(`${res.getMessage()}`);
        } else {
            alert(`Error: ${res.getMessage()}`);
        }
    }
}

export function executeSurvey() {
    management();

    function management() {
        alert("Bienvenido a la sección de respuesta de encuestas");

        const survey = selectSurvey();
        if (!survey) return;

        const questions = survey.questions;
        if (questions.length < 8) {
            alert("Esta encuesta no tiene suficientes preguntas. Se requieren al menos 8.");
            return;
        }

        // Validar que todas las preguntas tengan al menos una respuesta
        const preguntasSinRespuestas = questions.filter(q => q.getAnswers().length === 0);
        if (preguntasSinRespuestas.length > 0) {
            alert("La encuesta contiene preguntas sin respuestas, no se puede responder.");
            return;
        }

        alert(`Encuesta seleccionada: "${survey.getTitle()}"`);

        let salir = false;

        while (!salir) {
            const op = parseInt(prompt(
                `Opciones para encuesta "${survey.getTitle()}":\n` +
                "1. Responder encuesta\n" +
                "2. Ver resultados\n" +
                "3. Salir"
            ));

            switch (op) {
                case 1:
                    voteAnswers(questions);
                    break;

                case 2:
                    const resumen = buildSummary(survey);
                    document.getElementById("output").innerText = resumen;
                    salir = true;
                    break;

                case 3:
                    salir = true;
                    break;

                default:
                    alert("Opción inválida.");
            }
        }
    }

    function selectSurvey() {
        const response = orquestator.listSurveys();
        if (response.statusCode !== 200) {
            alert("Error al obtener encuestas.");
            return null;
        }

        const surveys = response.getData();
        const validSurveys = surveys.filter(s => s.questions.length >= 8);

        if (validSurveys.length === 0) {
            alert("No hay encuestas con al menos 8 preguntas disponibles.");
            return null;
        }

        const lista = validSurveys.map(s => `ID: ${s.surveyId}, Título: ${s.title}`).join('\n');
        const id = parseInt(prompt(`Encuestas disponibles:\n\n${lista}\n\nIngrese el ID de la encuesta que desea responder:`));
        const selected = validSurveys.find(s => s.surveyId === id);

        if (!selected) {
            alert("Encuesta no encontrada.");
            return null;
        }

        return selected;
    }

    function voteAnswers(questions) {
        for (let index = 0; index < questions.length; index++) {
            const question = questions[index];
            alert(`Pregunta ${index + 1}: ${question.getTitle()}`);

            const answers = question.getAnswers();
            const lista = answers.map(a => `ID: ${a.answerId}, Texto: ${a.text}`).join('\n');
            const id = parseInt(prompt(`Respuestas disponibles:\n\n${lista}\n\nIngrese el ID de la respuesta a votar:`));
            const selected = answers.find(a => a.answerId === id);

            if (!selected) {
                alert("Respuesta no válida. Se saltará esta pregunta.");
                continue;
            }

            const res = selected.addVote();
            alert(res.getMessage());
        }

        alert("Gracias por completar la encuesta.");
    }

    function buildSummary(survey) {
        let resumen = `Resumen de la encuesta: "${survey.getTitle()}"\n\n`;

        survey.questions.forEach((question, qIndex) => {
            resumen += `Pregunta ${qIndex + 1}: ${question.getTitle()}\n`;
            const answers = question.getAnswers();

            if (answers.length === 0) {
                resumen += "  Sin respuestas registradas.\n";
            } else {
                answers.forEach(answer => {
                    resumen += `  - ${answer.getText()}: ${answer.conteo} voto(s)\n`;
                });
            }

            resumen += "\n";
        });
        
        return resumen;
    }
}
