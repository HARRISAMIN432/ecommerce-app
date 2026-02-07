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

    await OtpModel.deleteOne({ _id: getOtpData._id });
    return response(true, 200, "OTP verified successfully");
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
