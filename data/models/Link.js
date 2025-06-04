module.exports = function(sequelize, dataTypes){
    let alias = "Link";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        url: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        description: {
            type: dataTypes.STRING(250),
            allowNull: false
        }
    }

    let config = {
        tableName: 'links',
        timestamps: false
    }

    let Link = sequelize.define(alias, cols, config);
    return Link;
}