import { emailVerificationLink } from "@/email/emailVerificationLink";
import { catchError } from "@/lib/catchError";
import { connectDB } from "@/lib/databaseConnection";
import { response } from "@/lib/response";
import { sendMail } from "@/lib/sendMail";
import { registerSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password, username, confirmPassword } = await request.json();
    const validation = registerSchema.safeParse({
      email,
      password,
      username,
      confirmPassword,
    });
    if (!validation.success) {
      return response(
        false,
        400,
        "Invalid or missing input",
        validation.error.format(),
      );
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return response(false, 409, "User with this email already exists");
    }
    // Create new user
    const newUser = new UserModel({ email, password, username });
    await newUser.save();
    await sendMail(
      "Email Verification from Developer Harris",
      newUser.email,
      emailVerificationLink(),
    );
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: newUser._id.toString() })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);

    await sendMail(
      "Email Verification from Developer Harris",
      newUser.email,
      emailVerificationLink(
        `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email/${token}`,
      ),
    );

    return response(
      true,
      201,
      "Registration success, please verify your email",
    );
  } catch (error) {
    console.error("Registration error:", error);
    return catchError(error);
  }
}
