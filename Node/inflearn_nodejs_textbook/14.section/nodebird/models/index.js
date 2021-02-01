const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};


const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize)
db.Post = require('./post')(sequelize, Sequelize)
db.Hashtag = require('./hashtag')(sequelize, Sequelize)

db.User.hasMany(db.Post)
db.Post.belongsTo(db.User)

db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' })
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' })
// 다대다 관계에서는 새로운 모델(테이블)이 생긴다.

db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' })
db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' })

db.User.belongsToMany(db.Post, { through: 'Like' })
db.Post.belongsToMany(db.User, { through: 'Like '})

module.exports = db;

