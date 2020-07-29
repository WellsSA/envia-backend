const log = require('log-to-file');

class PaymentsControler {
  async store(req, res) {
    log(
      `\n+++++++ new request +++++++++
       \ndata: ${JSON.stringify(req.query)}
       \n+++++++++++++++++`,
      'notify.log'
    );
    return res.json({ success: true });
  }
}

export default new PaymentsControler();
