function getState(chatId) {
    let userProperties = PropertiesService.getUserProperties();
    let state = userProperties.getProperty(chatId);
    return state ? JSON.parse(state) : {};
}

function setState(chatId, state) {
    let userProperties = PropertiesService.getUserProperties();
    userProperties.setProperty(chatId, JSON.stringify(state));
}

function resetState(chat) {
    let userProperties = PropertiesService.getUserProperties();
    userProperties.deleteProperty(chat);
}
