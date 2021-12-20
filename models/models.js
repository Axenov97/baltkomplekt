const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING(126), unique: true},
    password: {type: DataTypes.STRING(126)},
    role: {type: DataTypes.STRING(126), defaultValue: 'ADMIN'},
})

const News = sequelize.define('news', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING(126)},
    description: {type: DataTypes.STRING(126)},
    description_2: {type: DataTypes.STRING(126)},
    description_3: {type: DataTypes.STRING(126)},
    keywords: {type: DataTypes.STRING(126)},
    publish_date: {type: DataTypes.DATE},
})

const Faq = sequelize.define('faq', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    question: {type: DataTypes.STRING(126)},
    answer: {type: DataTypes.STRING(126)},
})

const Cases = sequelize.define('case', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING(126)},
    description: {type: DataTypes.STRING(126)},
    meta_title: {type: DataTypes.STRING(126)},
    meta_description: {type: DataTypes.STRING(126)},
    meta_keywords: {type: DataTypes.STRING(126)},
    meta_link: {type: DataTypes.STRING(126)}
})

const Materials = sequelize.define('materials', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING(126)},
    description: {type: DataTypes.STRING(126)},
    document: {type: DataTypes.STRING(126), allowNull: false}
})

module.exports = {
    User,
    News,
    Faq,
    Cases,
    Materials
}