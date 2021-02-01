const sequelize = require("sequelize");

module.exports = ((sequelize, DataTypes) => (
  sequelize.define('post', {
    content: {
      type: DataTypes.STRING(140),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(200), // 이미지 저장한 서버주소
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
))