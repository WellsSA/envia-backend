class SessionsController {
  async index(req, res) {
    return res.json({
      token: 'ebK97628.adgb.test',
      user: {
        id: 1,
      },
    });
  }
}

export default new SessionsController();
