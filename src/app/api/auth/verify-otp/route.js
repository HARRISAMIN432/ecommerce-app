import { catchError } from "@/lib/catchError";
import { connectDB } from "@/lib/databaseConnection";
import { response } from "@/lib/response";
import { otpSchema } from "@/lib/zodSchema";
import OtpModel from "@/models/Otp.model";
import { cookies } from "next/headers";
import UserModel from "@/models/User.model";
import * as jose from "jose";

export async function POST(req) {
  try {
    await connectDB();
    const payload = await req.json();
    const validation = otpSchema.safeParse(payload);
    if (!validation.success) {
      return response(false, 400, validation.error?.errors[0]?.message);
    }
    const { email, otp } = validation.data;
    const getOtpData = await OtpModel.findOne({ email, otp });
    if (!getOtpData) {
      return response(false, 400, "Invalid OTP");
    }
    if (getOtpData.expiresAt < new Date()) {
      return response(false, 400, "OTP has expired");
    }
    const user = await UserModel.findOne({ email, deletedAt: null });
    if (!user) {
      return response(false, 404, "User not found");
    }
    const userData = {
      _id: user._id,
      role: user.role,
      name: user.username,
      avatar: user.avatar,
    };
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({ userId: user._id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(secret);
    const cookieStore = await cookies();
    cookieStore.set({
      name: "access_token",
      value: token,
      httpOnly: process.env.NODE_ENV === "production",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    await OtpModel.deleteOne({ _id: getOtpData._id });
    return response(true, 200, "OTP verified successfully", userData);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
