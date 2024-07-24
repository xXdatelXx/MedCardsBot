function addPatient(chatId, text, state) {
    if (!state.step) {
        setState(chatId, { command: '/addpatient', step: 1 });
        sendMessage(chatId, 'Напишiть iмя');
    } else if (state.step === 1) {
        if (patientExist(text)) {
            sendMessage(chatId, 'Такий пацієнт вже доданий');
            resetState(chatId);
            return;
        }
        state.name = text;
        setState(chatId, { command: '/addpatient', step: 2, name: state.name });
        sendMessage(chatId, 'Напишiть контактну iнформацию');
    } else if (state.step === 2) {
        state.contactInfo = "'" + text;
        setState(chatId, { command: '/addpatient', step: 3, name: state.name, contactInfo: state.contactInfo });
        sendMessage(chatId, 'Напишiть додаткову iнформацию');
    } else if (state.step === 3) {
        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Patients');
        sheet.appendRow([state.name, state.contactInfo, text || '']);
        sendMessage(chatId, 'Пацієнт доданий');
        resetState(chatId);
    }
}

function findAllPatients() {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Patients');
    let data = sheet.getDataRange().getValues();
    let result = [];

    for (let i = 1; i < data.length; i++) {
        let additionalInfo = data[i][2] != "" ? " | " + data[i][2] : ""
        let column = i + ") " + "`" + data[i][0] + "`" + " | " + "`" + data[i][1] + "`" + additionalInfo;
        result.push(column);
    }

    return result.join("\n");
}

function deletePatient(chatId, text, state) {
    if (!state.step) {
        setState(chatId, { command: '/deletepatient', step: 1 });
        sendMessage(chatId, 'Напишiть iмя');
    } else {
        if (!patientExist(text)) {
            sendMessage(chatId, 'Такий пацієнт не доданий');
            return;
        }
        setState(chatId, { command: "/deleteworkbyname", step: 1 });
        deleteWorkByName(chatId, text, getState(chatId), "/deleteworkbyname", "Work Log");
        setState(chatId, { command: "/deletescheduleworkbyname", step: 1 });
        deleteWorkByName(chatId, text, getState(chatId), "/deletescheduleworkbyname", "Schedule", true);


        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Patients");
        let data = sheet.getDataRange().getValues();
        for (let i = data.length - 1; i > 0; i--) {
            if (text == data[i][0]) {
                sheet.deleteRow(i + 1);

            }
        }

        resetState(chatId);
        sendMessage(chatId, "Пацієнт видалений");
    }
}

function patientExist(patientName) {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Patients');
    let data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
        if (data[i][0] === patientName) {
            return true;
        }
    }
    return false;
}

function updatePatientContactInfo(chatId, text, state) {
    if (!state.step) {
        setState(chatId, { command: '/updatepatientcontactinfo', step: 1 });
        sendMessage(chatId, 'Напишiть iмя пацiента для замiни контактной iнформацii');
    } else if (state.step === 1) {
        if (!patientExist(text)) {
            sendMessage(chatId, 'Пацієнта не iснує');
            resetState(chatId);
            return;
        }

        state.name = text;
        setState(chatId, { command: '/updatepatientcontactinfo', step: 2, name: state.name });
        sendMessage(chatId, 'Напишiть нову контактну iнформацию');
    } else {
        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Patients');
        let data = sheet.getDataRange().getValues();
        for (let i = 1; i < data.length; i++) {
            if (data[i][0] === state.name) {
                sheet.getRange(i + 1, 2).setValue("'" + text);
                break;
            }
        }
        sendMessage(chatId, 'Контактна iнформацiя змiнена');
        resetState(chatId);
    }
}

function updatePatientAdditionalInfo(chatId, text, state) {
    if (!state.step) {
        setState(chatId, { command: '/updatepatientadditionalinfo', step: 1 });
        sendMessage(chatId, 'Напишiть iмя пацiента для замiни додатковоi iнформацii');
    } else if (state.step === 1) {
        if (!patientExist(text)) {
            sendMessage(chatId, 'Пацієнта не iснує');
            resetState(chatId);
            return;
        }

        state.name = text;
        setState(chatId, { command: '/updatepatientadditionalinfo', step: 2, name: state.name });
        sendMessage(chatId, 'Напишiть нову додаткову iнформацiю');
    } else {
        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Patients');
        let data = sheet.getDataRange().getValues();
        for (let i = 1; i < data.length; i++) {
            if (data[i][0] === state.name) {
                sheet.getRange(i + 1, 3).setValue(text);
                break;
            }
        }
        sendMessage(chatId, 'Додаткова iнформацiя змiнена');
        resetState(chatId);
    }
}