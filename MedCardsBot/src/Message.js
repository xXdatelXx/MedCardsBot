let TELEGRAM_API_TOKEN = 'YOUR-TOKEN';

function sendMessage(chatId, text) {
    let url = 'https://api.telegram.org/bot' + TELEGRAM_API_TOKEN + '/sendMessage';
    let payload = {
        'chat_id': "" + chatId,
        'text': text,
        'parse_mode': 'Markdown'
    };
    let options = {
        'method': 'post',
        'payload': payload
    };
    UrlFetchApp.fetch(url, options);
}
