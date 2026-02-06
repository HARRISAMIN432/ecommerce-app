"use client";

import { otpSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { CustomButton } from "@/components/application/CustomButton";
import { useState } from "react";
import { showToast } from "@/lib/showToast";
import axios from "axios";

const OTPVerification = ({ email, onSubmit, loading }) => {
  const [isResendingOtp, setIsResendingOtp] = useState(false);

  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
      email,
    },
  });

  const handleSubmit = async (data) => {
    onSubmit(data);
  };

  const resendOTP = async () => {
    setIsResendingOtp(true);
    try {
      const { data: resendOTPResponse } = await axios.post(
        "/api/auth/resend-otp",
        { email },
      );
      if (!resendOTPResponse.success) {
        throw new Error(resendOTPResponse.message || "OTP resend failed");
      }
      showToast(
        "success",
        resendOTPResponse.message ||
          "OTP resent successfully! Please check your email.",
      );
    } catch (error) {
      console.error("Resend OTP Error:", error);
      showToast(
        "error",
        error.response?.data?.message ||
          error.message ||
          "Error resending OTP. Please try again later.",
      );
    } finally {
      setIsResendingOtp(false);
    }
  };

  return (
    <Form {...form}>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">
          Please complete Verification
        </h1>
        <p className="text-md">
          We have sent an One-time Password (OTP) to your registered email
          address. The OTP is valid for 10 minutes only
        </p>
      </div>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className={"flex justify-center items-center mt-4"}>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot
                        className={"text-xl size-10"}
                        key={i}
                        index={i}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mb-3">
          <CustomButton
            type="submit"
            text="Verify"
            loading={loading}
            className="w-full h-11 text-lg font-medium"
          />
          <div className="text-center mt-5">
            {!isResendingOtp ? (
              <button
                type="button"
                onClick={resendOTP}
                className="text-blue-500 hover:underline"
              >
                Resend OTP
              </button>
            ) : (
              <span className="text-md">Resending...</span>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default OTPVerification;
