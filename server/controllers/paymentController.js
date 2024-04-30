const { YooCheckout } = require('@a2seven/yoo-checkout');
const { default: axios } = require('axios');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../error/ApiError');
const { Order } = require('../models/models');
const SHOP_ID = 368853

const authorization = "Basic MzY4ODUzOnRlc3RfOGR6YVhZTXhQVVRqNHNNN2c5ZjdDZXhOU3Z1X3FfSjhnWUxnVTIxaFloaw=="
const initial_payment_msg = "Списываем оплату за заказ";

class PaymentController {
  
  async createPayment(req, res, next) {
    const { amount, orderId } = req.body
    console.log(amount); 
    const url = "https://api.yookassa.ru/v3/payments";
    const headers = {
        "Authorization": authorization,
        "Idempotence-Key": uuidv4().toString(),
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

      if (response.data.status === 'pending') {
          const order = await Order.findOne({where: {id: orderId}})
          if (!order) {
            return
          }
          order.paymentId = response.data.payment_method.id
          await order.save()
        //   console.log(order);
        //   console.log(response);
          const paymentData = response.data;
        //   res.json(response.data)
          res.json({ confirmationUrl: paymentData.confirmation.confirmation_url });
      } else {
          console.error('Failed to create payment:', response.statusText);
          return next(ApiError.internal('Ошибка в создании платежа'))

      }
    } catch (error) {
        console.error(error);
        return next(ApiError.badRequest(error))
    }

  }

  async ukassaWebHook(req, res, next) {
    try {
        if (req.body.event == "payment.waiting_for_capture") {
            const payment_id = req.body.object.id;
            const status = req.body.object.status;
            if (status == "waiting_for_capture") {
                await confirmPayment(payment_id);
                await getPayment(payment_id);
            }
        }
        res.send("OK");
    } catch (e) {
        console.error("ERROR", e);
        res.status(500).send({
            "status": "error",
            "body": e.message
        });
    }
  } 

  async getPaymentApi(req, res, next) {
    var payment_id = req.body.payment_id;
    await getPayment(payment_id);
    res.status(200);
  } 
  async cancelPaymentApi(req, res, next) {
    var payment_id = req.body.payment_id;
    await cancelPayemnt(payment_id);
    res.status(200);
  } 

}

module.exports = new PaymentController()


const confirmPayment = async (payment_id) => {

    try {
        const order = await Order.findOne({where: {paymentId: payment_id}})
        
        if (!order) {
          return next(ApiError.badRequest('Продукт не найден!'))
        }

        order.status = 'Оплачен' 
        await order.save()
        
        console.log('confirmPayment', order);
    } catch (error) {
        return next(ApiError.internal('Ошибка в подтверждении платежа!', error))
    }


    // await admin.firestore().collection('orders').where("payment_id", "==", payment_id)
    // .limit(1)
    // .get()
    // .then(snapshot => {
    //     if (snapshot.size > 0) {
    //         const firstDoc = snapshot.docs[0].ref;
    //         firstDoc.update({paid: true}).then(() => {
    //             console.log('Документ успешно обновлен');
    //           })
    //           .catch(err => {
    //             console.log('Ошибка обновления документа', err);
    //           });
    //       } else {
    //         console.log("документы не найдены");
    //       }
    // })
    // .catch(err => {
    //     console.log('Ошибка получения документа', err);
    //     return null
    // });
}

const getPayment = async (payment_id) => {
    try {
        const url = `https://api.yookassa.ru/v3/payments/${payment_id}/capture`;
    
        var headers = {
            "Authorization": authorization,
            "Idempotence-Key": uuidv4().toString(),
            "Content-Type": 'application/json'
        };
    
        const res = await axios.post(url, {}, {
            headers: headers,
        });
    
        console.log("Платеж успешно подтвержден", res.data);
        
    } catch (error) {
        console.error("Ошибка при подтверждении платежа", e);
    }

    // return await axios.post(url, {}, {
    //     headers: headers,
    // }).then((res) => res.data).then(async (res) => {
    //     functions.logger.log("Платеж успешно подтвержден", res);
    //     return true;
    // }).catch((err) => {
    //     functions.logger.log("Ошибка при подтверждении платежа", err);
    //     return false;
    // });
}

const cancelPayemnt = async (payment_id) => {
    try {
        const url = `https://api.yookassa.ru/v3/payments/${payment_id}/cancel`;

        const headers = {
            "Authorization": authorization,
            "Idempotence-Key": uuidv4().toString(),
            "Content-Type": 'application/json'
        };

        const res = await axios.post(url, {}, {
            headers: headers,
        });

        console.log("Платеж успешно отменен", res.data);
    } catch (e) {
        console.error("Ошибка при отмене платежа", e);
    }

    // return await axios.post(url, {}, {
    //     headers: headers,
    // }).then((res) => res.data).then(async (res) => {
    //     functions.logger.log("Платеж успешно отменен", res);
    //     return true;
    // }).catch((err) => {
    //     functions.logger.log("Ошибка при отмене платежа", err);
    //     return false;
    // });
}




