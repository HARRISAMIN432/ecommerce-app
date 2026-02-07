"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Logo from "../../../../assets/images/logo-black.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/zodSchema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomButton } from "@/components/application/CustomButton";
import Link from "next/link";
import { WEBSITE_LOGIN } from "@/routes/websiteRoute";
import axios from "axios";
import { showToast } from "@/lib/showToast";
import OTPVerification from "@/components/application/OTPVerification";
import UpdatePassword from "@/components/application/UpdatePassword";

const ResetPasswordPage = () => {
  const [emailVerificationLoading, setEmailVerificationLoading] =
    useState(false);
  const [OTPVerificationLoading, SetOTPVerificationLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const formSchema = loginSchema.pick({ email: true });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleEmailVerification = async (data) => {
    setEmailVerificationLoading(true);
    try {
      const { data: otpResponse } = await axios.post(
        "/api/auth/reset-password/send-otp",
        data,
      );
      if (!otpResponse.success) {
        throw new Error(otpResponse.message || "Error Sending OTP");
      }
      setOtpEmail(data.email);
      showToast("success", otpResponse.message || "OTP sent successfully");
    } catch (error) {
      console.error("Login error:", error);
      showToast(
        "error",
        error.response?.data?.message || error.message || "Failed sending OTP",
      );
    } finally {
      setEmailVerificationLoading(false);
    }
  };

  const handleOTPVerification = async (data) => {
    SetOTPVerificationLoading(true);
    try {
      const { data: otpResponse } = await axios.post(
        "/api/auth/reset-password/verify-otp",
        data,
      );
      if (!otpResponse.success) {
        throw new Error(otpResponse.message || "OTP Verification Failed");
      }
      showToast(
        "success",
        otpResponse.message ||
          "OTP verified successfully! Redirecting to dashboard...",
      );
      setIsOtpVerified(true);
    } catch (error) {
      console.error("Login error:", error);
      showToast(
        "error",
        error.response?.data?.message ||
          error.message ||
          "OTP Verification Failed",
      );
    } finally {
      SetOTPVerificationLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-[450px] mx-4 shadow-lg">
      <CardContent className="px-8">
        {/* Logo Section */}
        <div className="flex justify-center mb-1">
          <Image
            src={Logo.src}
            width={Logo.width}
            height={Logo.height}
            alt="logo"
            className="max-w-[150px] sm:max-w-[180px]"
          />
        </div>

        {!otpEmail ? (
          <>
            <div className="text-center mb-6 border-b border-gray-200 pb-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                Reset your password
              </h1>
              <p className="text-gray-600 text-md">
                Enter your Email for Password Reset
              </p>
            </div>

            {/* Form Section */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleEmailVerification)}
                className="space-y-6"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-medium text-gray-700">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="ahmedaliakbar@example.com"
                          className="h-11 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <CustomButton
                  type="submit"
                  text="Send OTP"
                  loading={emailVerificationLoading}
                  className="w-full h-11 mb-4 text-lg font-medium mt-2"
                />
                <div className="text-center text-gray-600 flex justify-center gap-1">
                  <Link href={WEBSITE_LOGIN} className="text-primary underline">
                    Back to Login
                  </Link>
                </div>
              </form>
            </Form>
          </>
        ) : (
          <>
            {!isOtpVerified ? (
              <OTPVerification
                email={otpEmail}
                loading={OTPVerificationLoading}
                onSubmit={handleOTPVerification}
              />
            ) : (
              <UpdatePassword email={otpEmail} />
            )}
          </>
        )}

        {/* Header Section */}
      </CardContent>
    </Card>
  );
};

export default ResetPasswordPage;
