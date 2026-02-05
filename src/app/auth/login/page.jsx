"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Logo from "../../../../assets/images/logo-black.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/zodSchema";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
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
import { WEBSITE_REGISTER } from "@/routes/websiteRoute";
import axios from "axios";
import { showToast } from "@/lib/showToast";
import OTPVerification from "@/components/application/OTPVerification";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [otpEmail, setOtpEmail] = useState(false);
  const [OTPVerificationLoading, SetOTPVerificationLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOTPVerification = async () => {};

  const handleLoginSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { data: loginResponse } = await axios.post("/api/auth/login", data);
      if (!loginResponse.success) {
        throw new Error(loginResponse.message || "Login Failed");
      }
      setOtpEmail(data.email);
      form.reset();
      showToast(
        "success",
        loginResponse.message ||
          "Login successful! Redirecting to dashboard...",
      );
    } catch (error) {
      console.error("Login error:", error);
      showToast(
        "error",
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please check your credentials and try again.",
      );
    } finally {
      setIsLoading(false);
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
                Login Into Account
              </h1>
              <p className="text-gray-600 text-md">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Form Section */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLoginSubmit)}
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

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="text-md font-medium text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={isTypePassword ? "password" : "text"}
                          placeholder="••••••••"
                          className="h-11 text-base"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute right-3 top-11.5"
                        onClick={() => setIsTypePassword(!isTypePassword)}
                      >
                        {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <CustomButton
                  type="submit"
                  text="Sign In"
                  loading={isLoading}
                  className="w-full h-11 mb-4 text-lg font-medium mt-2"
                />
                <div className="text-center text-gray-600 flex justify-center gap-1">
                  <p>Don't have account?</p>
                  <Link
                    href={WEBSITE_REGISTER}
                    className="text-primary underline"
                  >
                    Create account
                  </Link>
                </div>
                <div className="text-center -mt-4 text-primary underline">
                  <Link href="#" className="text-primary underline">
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </Form>
          </>
        ) : (
          <OTPVerification
            email={otpEmail}
            loading={OTPVerificationLoading}
            onSubmit={handleOTPVerification}
          />
        )}

        {/* Header Section */}
      </CardContent>
    </Card>
  );
};

export default LoginPage;
