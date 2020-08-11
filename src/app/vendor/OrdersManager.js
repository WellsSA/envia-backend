import MercadoPago from 'mercadopago';
import mercadoPagoConfig from '../../config/mercadopago';
import { Orders } from '../schemas';

class OrdersManager {
  constructor() {
    this.init();
  }

  init() {
    MercadoPago.configure(mercadoPagoConfig);
    this.gateway = MercadoPago;
  }

  async storeOrder({ userId, kind, quantity, status }) {
    return Orders.create({ userId, kind, quantity, status });
  }

  preparePurchaseOrder({ id, title, quantity, unit_price, payer_email }) {
    return {
      items: [
        {
          id: id,
          title: title,
          description: title,
          quantity: +quantity,
          currency_id: 'BRL',
          unit_price: parseFloat(unit_price),
        },
      ],
      payer: {
        email: payer_email,
      },
      auto_return: 'all',
      external_reference: String(id),
      back_urls: {
        success: process.env.MERCADO_PAGO_BACK_URL + '/success',
        pending: process.env.MERCADO_PAGO_BACK_URL + '/pending',
        failure: process.env.MERCADO_PAGO_BACK_URL + '/failure',
      },
    };
  }

  async createPurchaseOrder(purchaseOrder) {
    return this.gateway.preferences.create(purchaseOrder);
  }
}

export default new OrdersManager();
