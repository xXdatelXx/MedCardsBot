function addWork(chatId, text, state, command, sheet) {
    if (!state.step) {
        sendMessage(chatId, 'Напишiть iмя пацієнта');
        setState(chatId, { command: command, step: 1 });
    } else if (state.step === 1) {
        if (!patientExist(text)) {
            sendMessage(chatId, 'Пацієнта не знайдено');
            return;
        }
        state.patientName = text
        sendMessage(chatId, 'Напишiть дату роботи (день/мiсяць/рiк)');
        setState(chatId, { command: command, step: 2, patientName: state.patientName });
    } else if (state.step === 2) {

        let dateParts = text.split('/');
        if (dateParts.length !== 3) {
            sendMessage(chatId, 'Невірний формат дати. Використовуйте день/місяць/рік');
            return;
        }

        state.workDate = text;
        sendMessage(chatId, 'Напишiть опис роботи');
        setState(chatId, { command: command, step: 3, patientName: state.patientName, date: state.workDate });
    } else if (state.step === 3) {
        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet);
        sheet.appendRow([state.patientName, state.date, text]);
        sendMessage(chatId, 'Робота додана');
        resetState(chatId);
    }
}

function findWork(chatId, patientName, state, command, sheet) {
    if (!state.step) {
        sendMessage(chatId, 'Напишiть iмя пацієнта');
        setState(chatId, { command: command, step: 1 });
    } else {
        if (!patientExist(patientName)) {
            sendMessage(chatId, 'Пацієнта не знайдено');
            return;
        }
        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet);
        let data = sheet.getDataRange().getValues();
        let result = [];
        let count = 0;
        for (let i = 1; i < data.length; i++) {
            if (data[i][0] === patientName) {
                count++;
                let dateParts = data[i][1].split('/');
                let date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                let formattedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), 'dd/MM/yyyy');


                result.push(count + ") " + data[i][2] + " | " + formattedDate);
            }
        }
        if (count == 0)
            result.push("Не знайдено роботи по пацієнту");

        sendMessage(chatId, result.join('\n'));
        resetState(chatId);
    }
}

function findWorkByDate(chatId, text, state, command, sheet) {
    if (!state.step) {
        setState(chatId, { command: command, step: 1 });
        sendMessage(chatId, 'Напишiть дату');
    } else if (state.step === 1) {
        let dateParts = text.split('/');
        if (dateParts.length !== 3) {
            sendMessage(chatId, 'Невірний формат дати. Використовуйте день/місяць/рік');
            return;
        }
        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet);
        let data = sheet.getDataRange().getValues();
        let result = [];
        let count = 0;
        let paramDate = new Date(text).toDateString();
        for (let i = 1; i < data.length; i++) {
            let sheetDate = new Date(data[i][1]).toDateString();
            if (sheetDate === paramDate) {
                count++;
                result.push(count + ") " + "`" + data[i][0] + "`" + " | " + data[i][2]);
            }
        }
        if (count == 0)
            result.push("Не знайдено роботи по датi");
        sendMessage(chatId, result.join('\n'));
        resetState(chatId);
    }
}

function deleteWorkByDate(chatId, text, state, command, sheet) {
    if (!state.step) {
        setState(chatId, { command: command, step: 1 });
        sendMessage(chatId, 'Напишiть iмя пацієнта');
    } else if (state.step === 1) {

        if (!patientExist(text)) {
            sendMessage(chatId, 'Пацієнта не знайдено');
            return;
        }

        state.patientName = text;
        setState(chatId, { command: command, step: 2, patientName: state.patientName });
        sendMessage(chatId, 'Напишiть дату роботи');
    } else if (state.step === 2) {
        let dateParts = text.split('/');
        if (dateParts.length !== 3) {
            sendMessage(chatId, 'Невірний формат дати. Використовуйте день/місяць/рік');
            return;
        }

        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet);
        let data = sheet.getDataRange().getValues();
        let isDate = text && !isNaN(Date.parse(text));
        let result = [];
        let count = 0;
        for (let i = data.length - 1; i > 0; i--) {
            if (isDate) {
                let sheetDate = new Date(data[i][1]).toDateString();
                let paramDate = new Date(text).toDateString();
                if (sheetDate === paramDate) {
                    count++;
                    result.push(count + ") " + data[i][2]);
                    sheet.deleteRow(i + 1);
                }
            }
        }
        if (count != 0) {
            sendMessage(chatId, "Видалена робота:");
            sendMessage(chatId, result.join("\n"));
        } else
            sendMessage(chatId, "Не знайдено роботи по датi");
        resetState(chatId);
    }
}

function deleteWorkByName(chatId, text, state, command, sheet, schedule = false) {
    if (!state.step) {
        setState(chatId, { command: command, step: 1 });
        sendMessage(chatId, 'Напишiть iмя пацієнта');
    } else {

        if (!patientExist(text)) {
            sendMessage(chatId, 'Пацієнта не знайдено');
            return;
        }

        state.patientName = text;
        setState(chatId, { command: command, step: 2, patientName: state.patientName });

        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet);
        let data = sheet.getDataRange().getValues();
        let result = [];
        let count = 0;
        for (let i = data.length - 1; i > 0; i--) {
            if (text == data[i][0]) {
                count++;

                let date = new Date(data[i][1]);
                let formattedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), 'dd/MM/yyyy');

                result.push(count + ") " + formattedDate + " | " + data[i][2]);
                sheet.deleteRow(i + 1);
            }
        }
        if (count != 0) {
            sendMessage(chatId, !schedule ? "Видалена робота" : "Запланована видалена робота:");
            sendMessage(chatId, result.join("\n"));
        } else
            sendMessage(chatId, !schedule ? "Не знайдено роботи по пацієнту" : "Не знайдено запланованої роботи по пацієнту");
        resetState(chatId);
    }
}