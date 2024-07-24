var TELEGRAM_API_TOKEN = '7330984114:AAG8Y71PYxyT2IcQjN_SBRJaJ7OrbkPjqzY';

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
