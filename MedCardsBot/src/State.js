function getState(chatId) {
    var userProperties = PropertiesService.getUserProperties();
    var state = userProperties.getProperty(chatId);
    return state ? JSON.parse(state) : {};
}

function setState(chatId, state) {
    var userProperties = PropertiesService.getUserProperties();
    userProperties.setProperty(chatId, JSON.stringify(state));
}

function resetState(chat)
{
    var userProperties = PropertiesService.getUserProperties();
    userProperties.deleteProperty(chat);
}
