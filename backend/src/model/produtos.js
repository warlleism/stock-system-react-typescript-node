const { Model, DataTypes } = require('sequelize')

class Produtos extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            preco: DataTypes.NUMBER,
            codigo: DataTypes.STRING,
            quantidade: DataTypes.NUMBER,
            categoria: DataTypes.STRING,
        }, {
            sequelize,
            timestamps: false
        })
    }
}

module.exports = Produtos