const getPurchaseOrder = ({
  id,
  title,
  quantity,
  unit_price,
  payer_email,
}) => ({
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
    success: process.env.MERCADO_PAGO_BACK_URL + '/settings/success',
    pending: process.env.MERCADO_PAGO_BACK_URL + '/settings/pending',
    failure: process.env.MERCADO_PAGO_BACK_URL + '/settings/failure',
  },
});

export { getPurchaseOrder };
