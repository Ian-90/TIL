const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        people: [People]
        equipments: [Equipment]
        equipmentAdvs: [EquipmentAdv]
        supplies: [Supply]
        givens: [Given]
    }
`

module.exports = typeDefs

