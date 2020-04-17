import { addHours } from 'date-fns';
import { User, UserSession } from '#root/db/models';
import generateUUID from '#root/helpers/generateUUID';
import hashPassword from '#root/helpers/hashPassword';
import passwordCompareSync from '#root/helpers/passwordCompareSync';

const USER_SESSION_EXPIRY_HOURS = 1;

const setupRoutes = app => {
  app.post('/sessions', async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error('Invalid body'));
    }

    try {
      const user = await User.findOne({
        attributes: {},
        where: { email }
      });

      if (!user) {
        return next(new Error('Invalid credentials'));
      }

      if (!passwordCompareSync(password, user.passwordHash)) {
        return next(new Error('Invalid credentials'));
      }

      const expiresAt = addHours(new Date(), USER_SESSION_EXPIRY_HOURS);
      const sessionToken = generateUUID();
      const userSession = await UserSession.create({
        id: sessionToken,
        userId: user.id,
        email,
        expiresAt
      });

      return res.json(userSession);
    } catch (err) {
      return next(err);
    }
  });

  app.post('/users', async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error('Invalid body'));
    }

    try {
      const passwordHash = hashPassword(password);
      const newUser = await User.create({
        id: generateUUID(),
        email,
        passwordHash
      });

      return res.json(newUser);
    } catch (err) {
      return next(err);
    };
  });

  app.get('/users', (req, res) => {
    res.json({message: 'ok'});
  });
};

export default setupRoutes;
