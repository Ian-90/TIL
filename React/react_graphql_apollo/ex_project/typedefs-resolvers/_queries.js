const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        people: [People]
        peopleFiltered(
            team: Int,
            sex: Sex,
            boold_type: BloodType,
            from: String
        ): [People]
        peoplePaginated(
            page: Int!,
            per_page: Int!
        ): [People]
        equipments: [Equipment]
        equipmentAdvs: [EquipmentAdv]
        supplies: [Supply]
        givens: [Given]
    }
`

module.exports = typeDefs

