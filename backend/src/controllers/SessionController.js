// index(listagem de um sessão), show(mostra uma sessão especifica), store(qunado vai criar uma sessao), update()atualiza uma sessao), destry(remove uma sessao)
const User = require('../models/User');


module.exports = {
    async store(req, res){
        const {email} = req.body;

        let user =  await User.findOne({email});

        if(!user){
            user = await User.create({ email });
        }

        return res.json(user);
    }
};


