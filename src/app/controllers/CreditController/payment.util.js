const getCurrentURL = req => req.protocol + '://' + req.get('host');

const PAYER = {
  email: 'comprador@gmail.com',
};

const MY_PRODUCT = {
  id: '123',
  title: 'Um PS4 maroto',
  quantity: 40,
  unit_price: 0.1,
};

const getPurchaseOrder = req => ({
  items: [
    {
      id: MY_PRODUCT.id,
      title: MY_PRODUCT.title,
      description: MY_PRODUCT.title,
      quantity: MY_PRODUCT.quantity,
      currency_id: 'BRL',
      unit_price: parseFloat(MY_PRODUCT.unit_price),
    },
  ],
  payer: {
    email: PAYER.email,
  },
  auto_return: 'all',
  external_reference: MY_PRODUCT.id,
  back_urls: {
    // success: getCurrentURL(req) + '/payments/success',
    // pending: getCurrentURL(req) + '/payments/pending',
    // failure: getCurrentURL(req) + '/payments/failure',
    success: 'localhost:3000/settings/success',
    pending: 'localhost:3000/settings/pending',
    failure: 'localhost:3000/settings/failure',
  },
});

export { getPurchaseOrder };
