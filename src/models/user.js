//user테이블 정의
const User = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "user", //시퀄라이즈에서 사용하는 이름
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      newcomer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      authNum : {
        type: DataTypes.STRING(20),
      },
      authStatus: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "user",
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = User;
