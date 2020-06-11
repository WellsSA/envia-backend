const getPurchaseOrder = ({
  id,
  title,
  quantity,
  unit_price,
  payer_email,
}) => ({
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
  external_reference: id,
  back_urls: {
    success: process.env.MERCADO_PAGO_BACK_URL + '/settings/success',
    pending: process.env.MERCADO_PAGO_BACK_URL + '/settings/pending',
    failure: process.env.MERCADO_PAGO_BACK_URL + '/settings/failure',
  },
});

export { getPurchaseOrder };
