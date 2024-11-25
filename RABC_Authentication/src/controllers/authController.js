const  User = require('../models/userModel.js');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const zxcvbn = require('zxcvbn');

function validatePassword(password, username) {
  const minLength = 8;
  const result = zxcvbn(password);

  // Check length
  if (password.length < minLength) {
    return { valid: false, error: 'Password must be at least 8 characters long.' };
  }

  // Check strength
  if (result.score < 3) { // zxcvbn scores range from 0 (weak) to 4 (strong)
    return { valid: false, error: 'Password is too weak. Try adding more variety.' };
  }

  // Prevent using username or email in the password
  if (password.includes(username)) {
    return { valid: false, error: 'Password should not include your username or personal details.' };
  }

  return { valid: true };
}


const register = async(req,res) => {
    // Implement registration logic here
    try{
        const {username,password,role}=req.body;
        const user=await User.findOne({username});

        if(user){
            return res.status(404).json({message: "Username already exists"})
        }
        const passwordValidationResult=validatePassword(password,username);
        if(!passwordValidationResult.valid) return res.status(400).json({message: passwordValidationResult.error});
        const hashedPassword= await bcrypt.hash(password,10);
        const newUser=new User({username,password:hashedPassword,role});
        await newUser.save();
        return res.status(201).json({message:`Registration done successfully with username ${newUser.username}`})
    }catch(err){
        return res.status(400).json({message: "something went wrong"})
    }
};

const login = async(req,res) => {
    try{
        const { username, password, otp } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid password"})
        }

        // If 2FA is enabled, verify the OTP
        if (user.is2FAEnabled) {
            console.log(user.twoFactorSecret+" "+otp)
            const isOtpValid = speakeasy.totp.verify({
                secret: user.twoFactorSecret,
                encoding: 'base32',
                token: otp,
            });
            if (!isOtpValid) return res.status(401).json({ error: 'Invalid OTP' });
        }

        //If all checks are successful generate jwt token
        const token=jwt.sign({id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );

        res.status(200).json({token});
    }catch(err){
        return res.status(500).json({message: "Something went wrong"})
    }
};

const enableTwoFactorAuth =  async (req, res) => {
    try {
        const { username} = req.body;

        const user = await User.findOne({ username });  
        if (!user) return res.status(404).json({ error: 'User not found' });
  
        // Generate a 2FA secret
        const secret = speakeasy.generateSecret({ name: 'RBAC_Project' });
    
        // Save the secret to the database
        user.twoFactorSecret = secret.base32;
        user.is2FAEnabled = true;
        await user.save();
    
        // Generate QR code
        QRCode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
            if (err) return res.status(500).json({ error: 'Failed to generate QR code' });
    
            // Return QR code to the user
            res.json({ qrCode: dataUrl });
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {register, login,enableTwoFactorAuth};