"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Logo from "../../../../assets/images/logo-black.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/zodSchema";
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
import { WEBSITE_LOGIN } from "@/routes/websiteRoute";
import { showToast } from "@/lib/showToast";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [isTypeConfirmPassword, setIsTypeConfirmPassword] = useState(true);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisterSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { data: res } = await axios.post("/api/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      if (!res) throw new Error(res.message);
      form.reset();
      showToast(
        "success",
        res.message ||
          "Registration successful! Please check your email to verify your account.",
      );
    } catch (error) {
      console.error("Registration error:", error);
      showToast(
        "error",
        error.response?.data?.message ||
          error.message ||
          "Registration failed. Please try again.",
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

        {/* Header Section */}
        <div className="text-center mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 text-md">
            Create your account by filling the form below
          </p>
        </div>

        {/* Form Section */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegisterSubmit)}
            className="space-y-6"
          >
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-medium text-gray-700">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="john_doe"
                      className="h-11 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

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
                      placeholder="john@example.com"
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
                    <div className="relative">
                      <Input
                        type={isTypePassword ? "password" : "text"}
                        className="h-11 text-base pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setIsTypePassword(!isTypePassword)}
                      >
                        {isTypePassword ? (
                          <FaRegEyeSlash size={18} />
                        ) : (
                          <FaRegEye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-md font-medium text-gray-700">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isTypeConfirmPassword ? "password" : "text"}
                        className="h-11 text-base pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          setIsTypeConfirmPassword(!isTypeConfirmPassword)
                        }
                      >
                        {isTypeConfirmPassword ? (
                          <FaRegEyeSlash size={18} />
                        ) : (
                          <FaRegEye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <CustomButton
              type="submit"
              text="Create Account"
              loading={isLoading}
              className="w-full h-11 mb-4 text-lg font-medium mt-2"
            />

            <div className="text-center text-gray-600 flex justify-center gap-1">
              <p>Already have an account?</p>
              <Link href={WEBSITE_LOGIN} className="text-primary underline">
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
