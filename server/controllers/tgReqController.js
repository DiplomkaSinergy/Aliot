const ApiError = require('../error/ApiError');

const TelegramApi = require('node-telegram-bot-api')

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_BOT_CHAT_ID;
const tGbot = new TelegramApi(telegramBotToken, { polling: true });

class tgReqController {

  async postReqCustomProduct(req, res, next) {

    try {
      let {name, phone, product} = req.body
      
      console.log(name, phone, product);
      const message = `Новая заявка!\n\nИмя: ${name}\nТелефон: ${phone}\nНазвание товара: ${product}`;
      console.log(message);

      const data = await tGbot.sendMessage(chatId, message)

      if (data) {
        console.log(data);
      }
   
      res.json('eeee')
      
    } catch (error) {
      
    }



    
  }
 

}

module.exports = new tgReqController()
