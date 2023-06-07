const models = require("../models");
const { Op } = require("sequelize");

exports.main = (req, res) => {
  res.render("index");
};
exports.signup = (req, res) => {
  res.render("signup");
};
exports.login = (req, res) => {
  res.render("login");
};
exports.CpostSignup = (req, res) => {
  console.log(req.body);
  models.user
    .create({
      email: req.body.email,
      username: req.body.username,
      nickname: req.body.nickname,
      password: req.body.password,
      newcomer: req.body.newcomer,
      created_at: new Date(),
      // left_at: user[i].deletedAt,
    })
    .then(() => {
      res.send({
        result: true,
        email: req.body.email,
        name: req.body.name,
        nickname: req.body.nickname,
        password: req.body.password,
        newcomer: Number(req.body.newcomer),
        created_at: req.body.created_at,
        // left_at: req.body.left_at,
      });
    });
};
exports.CpostLogin = async (req, res) => {
  // models.user
  //   .findOne({
  //     email: req.body.email,
  //     password: req.body.password,
  //   })
  //   .then(() => {
  //     res.send({
  //       email: req.body.email,
  //       password: req.body.password,
  //     });
  //   });
  // select email, password from user where email='a'
  console.log(req.body);
  console.log("11112222");
  const result = await models.user.findOne({
    attributes: ["email", "password"],
    where: {
      email: req.body.email,
    },
  });
  console.log("result", result);
  console.log(result.dataValues);
  // 비밀번호 비교 맞으면 true
  if (result.dataValues.password == req.body.password) {
    res.send({ result: true });
  }
};
