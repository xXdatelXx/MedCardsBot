var TELEGRAM_API_TOKEN = 'YOUR-TOKEN';

function sendMessage(chatId, text) {
    var url = 'https://api.telegram.org/bot' + TELEGRAM_API_TOKEN + '/sendMessage';
    var payload = {
        'chat_id': "" + chatId,
        'text': text,
        'parse_mode': 'Markdown'
    };
    var options = {
        'method': 'post',
        'payload': payload
    };
    UrlFetchApp.fetch(url, options);
}
