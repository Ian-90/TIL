const { Good, Auction, User, sequelize } = require('./models')

// 서버가 꺼졌을 때, 스케줄러가 날라가는 것을 해결하기 위한 처리

module.exports = async () => {
  try {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const targets = await Good.findAll({
      where: {
        soldId: null,
        createdAt: { $lte: yesterday },
      },
    })
    targets.forEach(async (target) => {
      const success = await Auction.find({
        where: { goodId: target.id },
        order: [['bid', 'DESC']],
      })
      await Good.update({ soldId: success.userId }, { where: { id: target.id } })
      await User.update({
        money: sequelize.literal(`money - ${success.bid}`),
      }, {
        where: { id: success.userId },
      })
    })
  } catch (error) {
    console.error(error)
  }
}