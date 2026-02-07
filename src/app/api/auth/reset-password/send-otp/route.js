import { otpEmail } from "@/email/otpEmail";
import { catchError } from "@/lib/catchError";
import { connectDB } from "@/lib/databaseConnection";
import { generateOTP } from "@/lib/generateOTP";
import { response } from "@/lib/response";
import { sendMail } from "@/lib/sendMail";
import { loginSchema } from "@/lib/zodSchema";
import OtpModel from "@/models/Otp.model";
import User from "@/models/User.model";

export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json();
    const validationSchema = loginSchema.pick({ email: true });
    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
      return response(
        false,
        400,
        "Invalid or missing input field",
        validatedData.error.message,
      );
    }
    const { email } = validatedData.data;
    const getUser = await User.findOne({ deletedAt: null, email });
    if (!getUser) {
      return response(false, 404, "User not found with this email");
    }
    await OtpModel.deleteMany({ email });
    const otp = generateOTP();
    const newOtpData = new OtpModel({ email, otp });
    await newOtpData.save();
    const otpSendStatus = await sendMail(
      "Verification Code",
      email,
      otpEmail(otp),
    );
    if (!otpSendStatus.success) {
      return response(
        false,
        500,
        "Failed to send OTP email. Please try again later.",
      );
    }
    return response(
      true,
      200,
      "OTP sent successfully to your email. Please check your inbox.",
    );
  } catch (e) {
    console.log("Reset Password OTP Error:", e);
    return catchError(e);
  }
}
