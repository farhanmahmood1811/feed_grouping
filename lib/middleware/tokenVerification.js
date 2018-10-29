"use strict";

import TokenService from '../service/token';

const TokenVerification = (req, res, next) => {
	if(!req.headers.authorization) {
		return res.status(401).send("Token not available in header");
	}
	if (req.headers.authorization.split(' ')[0] === 'Bearer') {
		try {
            req.user = TokenService.verify(req.headers.authorization.split(' ')[1]);
			next()
		} catch(err) {
			return res.status(401).send("Invalid Token");
		}
	} else {
		return res.status(401).send("Inavlid Authorization")
	}
}

export default TokenVerification;
