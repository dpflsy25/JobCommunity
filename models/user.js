const user = function (Sequelize, DataTypes) {
  return Sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: "id",
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        commnet: "이메일",
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: "이름",
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: "닉네임",
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "비밀번호",
      },
      newcomer: {
        type: DataTypes.TINYINT,
        allowNull: true,
        comment: "신입/경력",
      },
      created_at: {
        // type: DataTypes.STRING(30),
        type: DataTypes.DATE,
        allowNull: false,
        comment: "가입일자",
      },
      left_at: {
        //type: DataTypes.STRING(30),
        type: DataTypes.DATE,
        allowNull: true,
        comment: "탈퇴일자",
      },
    },
    {
      tableName: "user",
      freezeTableName: true,
      timestamps: false,
    }
  );
};
module.exports = user;
