const db = require("../models");
const { Op } = require("sequelize");
const question = require("../models/question");
const sequelize = db.sequelize;
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const config = require(__dirname + "/../config/config.json");
const secretKey = config.jwtKey;

// 답변 조회
exports.getAnswers = async (req, res) => {
  try {
    const questionId = req.params.question_id;
    const result = await db.answer.findAll({
      attributes: [
        "id",
        "question_id",
        "content",
        "user_id",
        "created_at",
        "updated_at",
      ],
      where: { question_id: questionId },
    });
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// 답변 작성
exports.postAnswer = async (req, res) => {
  try {
    // 로그인 유무에 대한 처리
    // JWT 토큰
    const token = req.cookies.authorization
      ? req.cookies.authorization.split(" ")[1]
      : null;

    const decodedToken = jwt.verify(token, secretKey);
    if (!token) {
      // 로그인 안됨
      return res
        .status(401)
        .send('<script>alert("로그인 후 이용해주세요.");</script>');
    }
    const userIdAuth = decodedToken.userId; // 로그인한 유저 ID 값 (인증된 값)
    const userId = userIdAuth ? userIdAuth : null; // 현재 사용자의 ID
    const loginOrNot = userId ? true : false; // 현재 로그인한 상태를 확인하는 변수

    // 해당하는 질문이 있는지 조회
    const questionId = req.params.question_id;
    const question = await db.question.findByPk(questionId);

    if (!question) {
      return res.status(404).send("존재하지 않는 질문입니다.");
    }

    // 질문이 존재하면 답변 작성 진행
    const result = await db.answer.create({
      question_id: questionId,
      content: req.body.comment,
      user_id: userId,
      created_at: new Date(),
    });

    if (!result) {
      return res.status(404).send("답변 작성을 실패하였습니다.");
    }
    const resData = {
      result: "답변 작성이 완료되었습니다.",
      redirectURL: `/questions/${questionId}`,
    };
    res.send(resData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// 답변 수정
exports.patchAnswer = async (req, res) => {
  try {
    // JWT 토큰
    const token = req.cookies.authorization
      ? req.cookies.authorization.split(" ")[1]
      : null;

    const decodedToken = jwt.verify(token, secretKey);

    if (!token) {
      // 로그인 안됨
      return res
        .status(401)
        .send('<script>alert("로그인 후 이용해주세요.");</script>');
    }

    const userIdAuth = decodedToken.userId;
    const userId = userIdAuth ? userIdAuth : null; // 현재 사용자의 ID
    const loginOrNot = userId ? true : false; // 현재 로그인한 상태를 확인하는 변수

    const answerId = req.params.answer_id;
    const questionId = req.params.question_id;

    // 해당 답변이 존재하는지 조회
    const answer = await db.answer.findByPk(answerId);

    if (!answer) {
      return res.status(404).send("존재하지 않는 답변입니다.");
    }

    // 작성자만 답변 수정
    if (parseInt(answer.user_id) !== parseInt(userId) && loginOrNot) {
      return res.status(403).send("권한이 없습니다.");
    }

    // 수정할 내용 가져오기
    const { content } = req.body;

    const result = await db.answer.update(
      { content, updated_at: new Date() },
      {
        where: {
          id: answerId,
          user_id: userId,
          question_id: questionId,
        },
      }
    );
    if (result === 0) {
      return res.status(404).send("존재하지 않는 답변입니다.");
    }
    const resData = {
      result: "수정되었습니다.",
      redirectURL: `/questions/${questionId}`,
    };

    res.send(resData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// 답변 삭제
exports.deleteAnswer = async (req, res) => {
  try {
    // JWT 토큰
    const token = req.cookies.authorization
      ? req.cookies.authorization.split(" ")[1]
      : null;

    const decodedToken = jwt.verify(token, secretKey);

    if (!token) {
      // 로그인 안됨
      return res
        .status(401)
        .send('<script>alert("로그인 후 이용해주세요.");</script>');
    }
    const userIdAuth = decodedToken.userId; // 현재 사용자의 ID
    const userId = userIdAuth ? userIdAuth : null;

    const answerId = req.params.answer_id;
    const questionId = req.params.question_id;

    // 해당 답변이 존재하는지 조회
    const answer = await db.answer.findByPk(answerId);
    if (!answer) {
      return res.status(404).send("존재하지 않는 답변입니다.");
    }

    // 작성자만 답변 삭제
    if (parseInt(answer.user_id) !== parseInt(userId)) {
      return res.status(403).send("권한이 없습니다.");
    }

    // 답변 삭제
    const result = await db.answer.destroy({
      where: {
        id: answerId,
        question_id: questionId,
      },
    });

    const resData = {
      result: "삭제되었습니다.",
      redirectURL: `/questions/${questionId}`,
    };
    if (result === 0) {
      return res.status(404).send("답변을 삭제하지 못했습니다.");
    }
    res.send(resData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
