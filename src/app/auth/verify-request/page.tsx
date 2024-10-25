"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function VerifyRequestPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Check your email
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-sm">
            Please confirm your email to complete registration. If you haven’t
            received the email, check your spam folder.
          </p>
          <Link
            href="/"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Continue
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
