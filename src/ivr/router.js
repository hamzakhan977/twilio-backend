const Router = require('express').Router;
const {welcome, menu, logs,logsData} = require('./handler');

const router = new Router();

// POST: /ivr/welcome
router.post('/welcome', (req, res) => {
  res.send(welcome(req));
});

router.get('/logs', (req, res) => {
  res.send(logs(req));
});

router.get('/logsData', async (req, res) => {
  let data = await logsData(req);
  res.send(data);
});

// POST: /ivr/menu
router.post('/menu', (req, res) => {
  const digit = req.body.Digits;
  return res.send(menu(digit));
});



module.exports = router;
