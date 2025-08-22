import User from '../models/User.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (userId: any) =>{
    return jwt.sign({id:userId},process.env.JWT_SECRET || 'mysecretkey123',{expiresIn:'1h'})
}

export const signup = async (req: any,res: any) => {
try {
    const {name,email,password} = req.body;

    //check if user exists
    const userExists = await User.findOne({email});
    if (userExists) { return res.status(400).json({ message: 'User Already Exists' }); }

    //create new user
        const user = await User.create({ name, email, password });

        //return token
        const token = generateToken(user._id);
        res.status(201).json({ token });
} catch (error) {
    console.error(error);
        res.status(500).json({ message: 'Server error' });
    
}
}

export const login = async (req: any,res: any) => {
try {
     const { email, password } = req.body;
        //check if user exists
        const user = await User.findOne({ email });
        if (!user) { return res.status(400).json({ message: 'Invalid user' }); }

        //compare passwords with bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { return res.status(400).json({ message: 'Invalid user' }); }

        //jwt , but whats its purpose
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'mysecretkey123', {
            expiresIn: '1d',
        });

        res.status(200).json({ token });
} catch (error) {
  console.error(error);
        res.status(500).json({ message: 'Server error' });   
}
}