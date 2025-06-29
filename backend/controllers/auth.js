const UserSchema = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Generate OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.register = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        // Validation
        if (!name || (!email && !phone) || !password) {
            return res.status(400).json({ message: 'Name, password, and either email or phone are required!' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters!' });
        }

        // Check if user already exists
        const existingUser = await UserSchema.findOne({
            $or: [
                { email: email || '' },
                { phone: phone || '' }
            ]
        });
        
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email or phone!' });
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Create user with unverified status
        const user = await UserSchema.create({
            name,
            email: email || null,
            phone: phone || null,
            password,
            otp,
            otpExpires,
            isVerified: false
        });

        // In a real app, you would send OTP via SMS/Email here
        console.log(`OTP for ${email || phone}: ${otp}`);

        res.status(201).json({
            message: 'User registered successfully. Please verify with OTP.',
            userId: user._id,
            otpSent: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.verifyOTP = async (req, res) => {
    const { userId, otp } = req.body;

    try {
        if (!userId || !otp) {
            return res.status(400).json({ message: 'User ID and OTP are required!' });
        }

        const user = await UserSchema.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified!' });
        }

        if (user.otp !== otp || user.otpExpires < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP!' });
        }

        // Verify user
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = generateToken(user._id);

        res.status(200).json({
            message: 'User verified successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.resendOTP = async (req, res) => {
    const { userId } = req.body;

    try {
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required!' });
        }

        const user = await UserSchema.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified!' });
        }

        // Generate new OTP
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // In a real app, you would send OTP via SMS/Email here
        console.log(`New OTP for ${user.email || user.phone}: ${otp}`);

        res.status(200).json({
            message: 'OTP resent successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.login = async (req, res) => {
    const { email, phone, password } = req.body;

    try {
        // Validation
        if ((!email && !phone) || !password) {
            return res.status(400).json({ message: 'Email/Phone and password are required!' });
        }

        // Check if user exists
        const user = await UserSchema.findOne({
            $or: [
                { email: email || '' },
                { phone: phone || '' }
            ]
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        if (!user.isVerified) {
            return res.status(400).json({ 
                message: 'Please verify your account first!',
                userId: user._id,
                needsVerification: true
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.user.id).select('-password -otp -otpExpires');
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email, phone } = req.body;

    try {
        if (!email && !phone) {
            return res.status(400).json({ message: 'Email or phone is required!' });
        }

        const user = await UserSchema.findOne({
            $or: [
                { email: email || '' },
                { phone: phone || '' }
            ]
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }

        // Generate OTP for password reset
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        user.resetPasswordOTP = otp;
        user.resetPasswordExpires = otpExpires;
        await user.save();

        // In a real app, you would send OTP via SMS/Email here
        console.log(`Password reset OTP for ${user.email || user.phone}: ${otp}`);

        res.status(200).json({
            message: 'Password reset OTP sent successfully',
            userId: user._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.resetPassword = async (req, res) => {
    const { userId, otp, newPassword } = req.body;

    try {
        if (!userId || !otp || !newPassword) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters!' });
        }

        const user = await UserSchema.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }

        if (user.resetPasswordOTP !== otp || user.resetPasswordExpires < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP!' });
        }

        // Update password
        user.password = newPassword;
        user.resetPasswordOTP = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};