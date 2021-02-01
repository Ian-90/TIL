module.exports = ((sequelize, DataTypes) => (
  sequelize.define('hashtag', {
    title: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
    chartset: 'utf-8',
    collate: 'utf8_general_ci',
  })
))
