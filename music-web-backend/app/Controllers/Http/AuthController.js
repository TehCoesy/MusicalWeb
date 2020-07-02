'use strict'

// const Hash = require("@adonisjs/framework/src/Hash");

const {validate} = use('Validator');
const User = use('App/Models/User');
const Hash = use('Hash')
// const ErrorFactory = use('App/Common/ErrorFactory');

class AuthController {       
    async register({request}) {

        const rules = {
            email: 'required|email|unique:users, email',
            username: 'required|unique:users, username',
            password: 'required'
        }

        const {email, username, password} = request.all();
        const validation = await validate(request.all(), rules);
        if (validation.fails()) {
            return validation.messages()
        }
        const user = new User();
        user.email = email;
        user.username = username;
        user.password = password;

        await user.save();

        return user;

    }

    async login({request, auth}) {
        const rules = {
            username: 'required',
            password: 'required'
        }

        const {username, password} = request.all();
        const validation = await validate(request.all(), rules);
        if (validation.fails()) {
            return validation.messages()
        }

        const user = await User.findBy('username', username);   

        if(user) {
            const verify = await Hash.verify(password, user.password);
            if(!verify) {
                return response.status(401).send('Incorrect Credential');
            }
            const token = await auth   
                .withRefreshToken()
                .attempt(user.email, password)

            return {                                                                                                                                
                status: true,
                token: token.token,
                refreshToken: token.refreshToken
            }
        }
    }

    async logout ({ response, auth}) {
        const user = auth.current.user;
        const token = auth.getAuthHeader();

        await auth.revokeTokens([token]);
        return response.send(
            'You have log out'
        )
    }
}

module.exports = AuthController
