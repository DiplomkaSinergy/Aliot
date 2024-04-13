const { YooCheckout } = require('@a2seven/yoo-checkout');
const { default: axios } = require('axios');

const SHOP_ID = 368853

const authorization = "Basic MzY4ODUzOnRlc3RfcjV3Z0w3WjZhd1N5TXZnWHcyemxWMHo4Qmo3VVA4bzNLTUNvdmFXZndtbw=="
const initial_payment_msg = "Списываем оплату за заказ";

class PaymentController {
  
  async createPayment(req, res, next) {
    const { amount } = req.body
    console.log(amount); 
    const url = "https://api.yookassa.ru/v3/payments";
    const headers = {
        "Authorization": authorization,
        "Idempotence-Key": '123qqq',
        "Content-Type": 'application/json'
    };

    const createPayload = {
        amount: {
            value: `${amount}`,
            currency: 'RUB'
        },
        payment_method_data: {
            type: "bank_card"
        },
        confirmation: {
            type: 'redirect',
            return_url: 'http://localhost:8080/my/orderlist'
        },
        description: initial_payment_msg,
    };

    try {

      const response = await axios.post(url, createPayload, { headers });

      if (response.status === 200) {
          console.log(response.data);
          const paymentData = response.data;
          res.json({ confirmationUrl: paymentData.confirmation.confirmation_url });
      } else {
          console.error('Failed to create payment:', response.statusText);
          res.status(500).json({ error: 'Failed to create payment' });
      }
    } catch (error) {
        console.error(error);
    }

  }




}


module.exports = new PaymentController()