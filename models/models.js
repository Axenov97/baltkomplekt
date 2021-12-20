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
    title: {type: DataTypes.TEXT('long')},
    description: {type: DataTypes.TEXT('long')},
    description_2: {type: DataTypes.TEXT('long')},
    description_3: {type: DataTypes.TEXT('long')},
    keywords: {type: DataTypes.TEXT('long')},
    publish_date: {type: DataTypes.DATE},
})

const Faq = sequelize.define('faq', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    question: {type: DataTypes.TEXT('long')},
    answer: {type: DataTypes.TEXT('long')},
})

const Cases = sequelize.define('case', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.TEXT('long')},
    description: {type: DataTypes.TEXT('long')},
    meta_title: {type: DataTypes.TEXT('long')},
    meta_description: {type: DataTypes.TEXT('long')},
    meta_keywords: {type: DataTypes.TEXT('long')},
    meta_link: {type: DataTypes.TEXT('long')}
})

const Materials = sequelize.define('materials', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.TEXT('long')},
    description: {type: DataTypes.TEXT('long')},
    document: {type: DataTypes.TEXT('long'), allowNull: false}
})

module.exports = {
    User,
    News,
    Faq,
    Cases,
    Materials
}