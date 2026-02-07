import { catchError } from "@/lib/catchError";
import { connectDB } from "@/lib/databaseConnection";
import { response } from "@/lib/response";
import { loginSchema } from "@/lib/zodSchema";
import User from "@/models/User.model";

export async function PUT(request) {
  try {
    await connectDB();
    const payload = await request.json();
    const validation = loginSchema.safeParse(payload);
    if (!validation.success) {
      return response(
        false,
        400,
        "Invalid input or missing data",
        validation.error.message,
      );
    }
    const { email, password } = validation.data;
    const getUser = await User.findOne({ deletedAt: null, email }).select(
      "+password",
    );
    if (!getUser) {
      return response(false, 404, "User not found");
    }
    getUser.password = password;
    await getUser.save();
    return response(true, 200, "Password updated successfully");
  } catch (e) {
    return catchError(e);
  }
}
