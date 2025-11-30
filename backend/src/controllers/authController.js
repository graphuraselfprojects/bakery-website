const Otp = require("../models/otp");

// Forgot Password Controller
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate OTP (4-digit)
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    // Save OTP
    await Otp.create({
      email,
      code, // << REQUIRED FIELD
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    // You should send this code to email
    console.log("Generated OTP:", code);

    res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = router;
