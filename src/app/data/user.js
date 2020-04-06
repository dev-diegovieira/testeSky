const UserMongo = require('../data/model/user');
const bcrypt = require('bcryptjs');
const _ = require('lodash');


class UserData {
    async get(filter = {}) {
        return await UserMongo.find(filter);
    }

    async insert(data) {
        if (data.senha)
            data.senha = await bcrypt.hash(data.senha, 10);

        const user = await UserMongo.create(data);

        return user;
    }
    
    async udpate(filter, data, upsert = false) {
        if (data.senha)
            data.senha = await bcrypt.hash(data.senha, 10);
        
        if (data.nome || data.senha || data.telefones)
            data.updatedAt = new Date();

        return await UserMongo.updateOne(filter, _.pick(data, ['nome', 'senha', 'telefones', 'updatedAt']) , {upsert});
    }
    
    async delete(filter) {
        if (data.senha)
            data.senha = await bcrypt.hash(data.senha, 10);
        
        if (data.nome || data.telefones)
            data.updatedAt = new Date();

        return await UserMongo.deleteOne(filter);
    }
}

module.exports = UserData;