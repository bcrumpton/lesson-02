
const User = use('App/Model/User');
const Hash = use('Hash');

// export default class UserController
module.exports = class UserController {

  // Save a new user
  * store(request, response) {
    // const username = request.only('username', 'password').username
    // const password = request.only('username', 'password').password
    const { username, password } = request.only('username', 'password');

    const user = yield User.create({ username, password: yield Hash.make(password) });

    response.send(user);
  }

  * login(request, response) {
    const { username, password } = request.only('username', 'password');

    const user = yield User.query().where({ username: username }).firstOrFail();

    const isValid = yield Hash.verify(password, user.password);

    if (!isValid) {
      return response.status(401).json({
        message: 'Invalid username/password'
      });
    }

    // Create a special passcode for the users
    const token = yield request.auth.generate(user);

    response.json({ token });
  }
}
