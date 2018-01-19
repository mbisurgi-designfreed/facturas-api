const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../../config');
const User = require('../../../models/user.model');

const options = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.jwt.secret
};

module.exports = new JwtStrategy(options, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);

        if (!user) {
            done(null, false);
        } else {
            done(null, user);
        }
    } catch (err) {
        done(err);
    }
});