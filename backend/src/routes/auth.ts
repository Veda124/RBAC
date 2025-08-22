import express from 'express';
import {signup,login} from '../controllers/authController.js'
import authMiddleware from '../middlewares/auth.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import User from '../models/User.js';
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);

router.get("/profile", authMiddleware, async (req: any, res) => {
  try {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});


router.get(
  "/users",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Error fetching users" });
    }
  }
);
console.log('api running')
export default router;