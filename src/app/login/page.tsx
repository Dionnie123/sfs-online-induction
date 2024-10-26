"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./form";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
