function doGet(e) {
    return HtmlService.createHtmlOutput("Hello, this is a GET request.");
}

function doPost(e) {
    let update = JSON.parse(e.postData.contents);
    let message = update.message;
    let chatId = message.chat.id;
    let text = message.text;

    handleUserInput(chatId, text);
}

function handleUserInput(chatId, text) {
    if (text.startsWith('/')) {
        resetState(chatId);
    }

    let state = getState(chatId);

    switch (state.command || text) {
        case '/addpatient':
            addPatient(chatId, text, state);
            break;
        case '/findallpatients':
            sendMessage(chatId, findAllPatients());
            break;
        case '/deletepatient':
            deletePatient(chatId, text, state);
            break;
        case '/updatepatientcontactinfo':
            updatePatientContactInfo(chatId, text, state);
            break;
        case '/updatepatientadditionalinfo':
            updatePatientAdditionalInfo(chatId, text, state);
            break;


        case '/addwork':
            addWork(chatId, text, state, '/addwork', "Work Log");
            break;
        case '/findwork':
            findWork(chatId, text, state, '/findwork', "Work Log");
            break;
        case '/findworkbydate':
            findWorkByDate(chatId, text, state, '/findworkbydate', "Work Log");
            break;
        case '/deleteworkbydate':
            deleteWorkByDate(chatId, text, state, '/deleteworkbydate', "Work Log");
            break;
        case '/deleteworkbyname':
            deleteWorkByName(chatId, text, state, '/deleteworkbyname', "Work Log");
            break;


        case '/schedulework':
            addWork(chatId, text, state, '/schedulework', "Schedule");
            break;
        case '/findschedulework':
            findWork(chatId, text, state, '/findschedulework', "Schedule");
            break;
        case '/findscheduleworkbydate':
            findWorkByDate(chatId, text, state, '/findscheduleworkbydate', "Schedule");
            break;
        case '/deletescheduleworkbydate':
            deleteWorkByDate(chatId, text, state, '/deletescheduleworkbydate', "Schedule");
            break;
        case '/deletescheduleworkbyname':
            deleteWorkByName(chatId, text, state, '/deletescheduleworkbyname', "Schedule");
            break;


        case '/start':
            sendMessage(chatId, "Здоров");
            break;
        default:
            sendMessage(chatId, 'Недійсна команда');
            break;
    }
}
