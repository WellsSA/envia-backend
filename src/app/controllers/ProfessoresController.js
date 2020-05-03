class ProfessoresControler {
  async index(req, res) {
    return res.json([
      {
        name: 'Wellington',
        id: 1,
      },
      {
        name: 'Manoel Teste',
        id: 2,
      },
    ]);
  }

  async store(req, res) {
    return res.json({ ok: true });
  }

  async update(req, res) {
    return res.json({ ok: true });
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new ProfessoresControler();
