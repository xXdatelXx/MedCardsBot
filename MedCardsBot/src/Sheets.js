function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Med Cards')
        .addItem('Create Sheets', 'createSheets')
        .addToUi();
}

function createSheets() {
    var ss = SpreadsheetApp.create("Medical Management System");

    var patientsSheet = ss.insertSheet("Patients");
    patientsSheet.getRange("A1:C1").setValues([["Name", "Contact Info", "Additional Info"]]);

    var workLogSheet = ss.insertSheet("Work Log");
    workLogSheet.getRange("A1:C1").setValues([["Patient Name", "Work Date", "Work Description"]]);

    var scheduleSheet = ss.insertSheet("Schedule");
    scheduleSheet.getRange("A1:C1").setValues([["Patient Name", "Scheduled Date", "Work Description"]]);

    // Remove the default 'Sheet1'
    ss.deleteSheet(ss.getSheetByName("Sheet1"));
}
