"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updatePasswordSchema } from "@/lib/zodSchema";
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
import axios from "axios";
import { Input } from "@/components/ui/input";
import { CustomButton } from "@/components/application/CustomButton";
import { showToast } from "@/lib/showToast";
import { useRouter } from "next/navigation";
import { WEBSITE_LOGIN } from "@/routes/websiteRoute";

const UpdatePassword = ({ email }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [isTypeConfirmPassword, setIsTypeConfirmPassword] = useState(true);

  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      email: email,
      password: "",
      confirmPassword: "",
    },
  });

  const handleUpdatePasswordSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { data: res } = await axios.put(
        "/api/auth/reset-password/update-password",
        data,
      );
      if (!res) throw new Error(res.message);
      form.reset();
      showToast("success", res.message);
      router.push(WEBSITE_LOGIN);
    } catch (error) {
      console.error("Registration error:", error);
      showToast("error", error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-8">
      {/* Header Section */}
      <div className="text-center mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
          Update Password
        </h1>
        <p className="text-gray-600 text-md">
          Create new password by filling below form
        </p>
      </div>

      {/* Form Section */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdatePasswordSubmit)}
          className="space-y-6"
        >
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
            text="Update Password"
            loading={isLoading}
            className="w-full h-11 mb-4 text-lg font-medium mt-2"
          />
        </form>
      </Form>
    </div>
  );
};

export default UpdatePassword;
