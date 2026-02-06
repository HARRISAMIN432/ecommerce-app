import { otpEmail } from "@/email/otpEmail";
import { catchError } from "@/lib/catchError";
import { connectDB } from "@/lib/databaseConnection";
import { generateOTP } from "@/lib/generateOTP";
import { response } from "@/lib/response";
import { sendMail } from "@/lib/sendMail";
import { otpSchema } from "@/lib/zodSchema";
import OtpModel from "@/models/Otp.model";
import User from "@/models/User.model";

export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json();
    const validatedSchema = otpSchema.pick({ email: true });
    const validation = otpSchema.safeParse(payload);
    if (!validation.success) {
      return response(false, 400, validation.error?.errors[0]?.message);
    }
    const { email } = validation.data;
    const getUser = await User.findOne({ email });
    if (!getUser) {
      return response(false, 404, "User not found");
    }
    await OtpModel.deleteMany({ email });
    const otp = generateOTP();
    const newOtpData = new OtpModel({
      email,
      otp,
    });
    await newOtpData.save();
    const otpSendStatus = await sendMail(
      "Your login verification code",
      email,
      otpEmail(otp),
    );
    if (!otpSendStatus.success) {
      return response(false, 500, "Failed to send OTP email");
    }
    return response(true, 200, "OTP resent successfully");
  } catch (e) {
    console.log(e);
    return catchError(e);
  }
}
