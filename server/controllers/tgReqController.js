const ApiError = require('../error/ApiError');

const TelegramApi = require('node-telegram-bot-api')

const telegramBotToken = '7101823828:AAFRbEdaXC1Zj_ssfvsrYxVYFrHihgXYoTY';
const tGbot = new TelegramApi(telegramBotToken, { polling: true });


class tgReqController {

  async postReqCustomProduct(req, res, next) {

    try {
      let {name, phone, product} = req.body
      
      console.log(name, phone, product);
      const message = `Новая заявка!\n\nИмя: ${name}\nТелефон: ${phone}\nНазвание товара: ${product}`;
      console.log(message);

      const data = await tGbot.sendMessage(1782142905, message)

      if (data) {
        console.log(data);
      }
   
      res.json('eeee')
      
    } catch (error) {
      
    }



    
  }
 

}

module.exports = new tgReqController()
