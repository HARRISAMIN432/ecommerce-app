import { catchError } from "@/lib/catchError";
import { connectDB } from "@/lib/databaseConnection";
import { response } from "@/lib/response";
import { jwtVerify } from "jose";
import UserModel from "@/models/User.model";

export async function POST(req) {
  try {
    await connectDB();
    const { token } = await req.json();
    if (!token) {
      return response(false, 400, "Missing token");
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const decoded = await jwtVerify(token, secret);
    const userId = decoded.payload.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return response(false, 404, "User not found");
    }
    user.isEmailVerified = true;
    await user.save();
    return response(true, 200, "Email verified successfully");
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
