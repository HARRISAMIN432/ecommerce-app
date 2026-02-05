"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import VerifiedImg from "../../../../../assets/images/verified.gif";
import VerificationFailedImg from "../../../../../assets/images/verification-failed.gif";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { WEBSITE_HOME } from "@/routes/websiteRoute";
import Link from "next/link";

const EmailVerificationPage = () => {
  const { token } = useParams();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const { data: response } = await axios.post("/api/auth/verify-email", {
        token,
      });
      if (response.success) {
        setIsVerified(true);
      }
    };
    verify();
  });

  return (
    <div>
      <Card className="w-[400px]">
        <CardContent>
          {isVerified ? (
            <div>
              <div className="flex justify-center items-center">
                <Image
                  src={VerifiedImg.src}
                  alt="verifiedImg"
                  height={VerifiedImg.height}
                  width={VerifiedImg.width}
                  className="h-[100px] w-auto"
                ></Image>
                <div className="text-center">
                  <h1 className="text-2xl text-green-500 font-bold">
                    Email Verification Success
                  </h1>
                  <Button asChild>
                    <Link href={WEBSITE_HOME}>Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-center items-center">
                <Image
                  src={VerificationFailedImg.src}
                  alt="verificationFailedImg"
                  height={VerificationFailedImg.height}
                  width={VerificationFailedImg.width}
                  className="h-[100px] w-auto"
                ></Image>
                <h1 className="text-center text-2xl text-red-500 font-bold">
                  😔 Verification failed. Please try again.
                </h1>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerificationPage;
