exports.verifyLoginAndPassword = (req, res, next) => {
    if (req.body['login'] && req.body['password']) {
        let login = req.body['login'];
        let password = req.body['password'];

        if (login.length < 5)
            return res.send({status: 400, code: "Your username must be higher than 5 character"});
        if (password.length < 5)
            return res.send({status: 400, code: "Your password must be higher than 5 character"});
        return next();
    }
    return res.send({status: 400, code: "Missing login, password or email post params !"});
};

exports.requireId = (req, res, next) => {
    if (req.body['id']) {
        next();
    } else {
        return res.send({status: 400, code: "Require user id"});
    }
};