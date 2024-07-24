function onOpen() {
    let ui = SpreadsheetApp.getUi();
    ui.createMenu('Med Cards')
        .addItem('Create Sheets', 'createSheets')
        .addToUi();
}

function createSheets() {
    let ss = SpreadsheetApp.create("Medical Management System");

    let patientsSheet = ss.insertSheet("Patients");
    patientsSheet.getRange("A1:C1").setValues([["Name", "Contact Info", "Additional Info"]]);

    let workLogSheet = ss.insertSheet("Work Log");
    workLogSheet.getRange("A1:C1").setValues([["Patient Name", "Work Date", "Work Description"]]);

    let scheduleSheet = ss.insertSheet("Schedule");
    scheduleSheet.getRange("A1:C1").setValues([["Patient Name", "Scheduled Date", "Work Description"]]);

    // Remove the default 'Sheet1'
    ss.deleteSheet(ss.getSheetByName("Sheet1"));
}
