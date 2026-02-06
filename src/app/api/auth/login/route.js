import { emailVerificationLink } from "@/email/emailVerificationLink";
import { otpEmail } from "@/email/otpEmail";
import { catchError } from "@/lib/catchError";
import { connectDB } from "@/lib/databaseConnection";
import { generateOTP } from "@/lib/generateOTP";
import { response } from "@/lib/response";
import { sendMail } from "@/lib/sendMail";
import { loginSchema } from "@/lib/zodSchema";
import OtpModel from "@/models/Otp.model";
import User from "@/models/User.model";
import { SignJWT } from "jose";

export async function POST(req) {
  try {
    await connectDB();
    const payload = await req.json();
    const validation = loginSchema.safeParse(payload);
    if (!validation.success) {
      return response(
        false,
        400,
        "Invalid Input or Missing Fields",
        validation.error,
      );
    }
    const { email, password } = validation.data;
    const getUser = await User.findOne({ deletedAt: null, email }).select(
      "+password",
    );
    if (!getUser) {
      return response(false, 400, "Invalid login credentials");
    }
    const isPasswordMatch = await getUser.comparePassword(password);
    if (!isPasswordMatch) {
      return response(false, 400, "Invalid login credentials");
    }
    if (!getUser.isEmailVerified) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const token = await new SignJWT({ userId: getUser._id.toString() })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(secret);
      await sendMail(
        "Email Verification from Developer Harris",
        getUser.email,
        emailVerificationLink(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`,
        ),
      );
      return response(
        false,
        403,
        "Email not verified. A new verification link has been sent to your email.",
      );
    }
    await OtpModel.deleteMany({ email });
    const otp = generateOTP();
    const newOtpData = new OtpModel({
      email,
      otp,
    });
    await newOtpData.save();
    const otpEmailStatus = await sendMail(
      "Your OTP Code for Login",
      email,
      otpEmail(otp),
    );
    if (!otpEmailStatus.success) {
      return response(
        false,
        500,
        "Failed to send OTP email. Please try again later.",
      );
    }
    return response(
      true,
      200,
      "Login successful. An OTP has been sent to your email for verification.",
    );
  } catch (err) {
    console.log(err);
    catchError(err);
  }
}
