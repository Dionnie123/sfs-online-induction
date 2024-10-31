"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CoursePage() {
  const [status, setStatus] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="relative h-64 w-full mb-8">
        <Image
          src="https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Title and Description */}
      <h1 className="text-4xl font-bold mb-2">Course Title</h1>
      <p className="text-lg mb-6">
        This is a detailed description of the course. Learn all you need to know
        to excel.
      </p>

      {/* File List */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Course Files</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>File 1: Course Introduction</li>
            <li>File 2: Module 1 - Basics</li>
            <li>File 3: Module 2 - Advanced Concepts</li>
            <li>File 4: Final Project Guide</li>
          </ul>
        </CardContent>
      </Card>

      {/* Select and Quiz Button */}
      <div className="flex items-center gap-4 mb-6">
        <Select onValueChange={(value) => setStatus(value)}>
          <SelectTrigger>Choose Status</SelectTrigger>
          <SelectContent>
            <SelectItem value="learning">I’m still learning</SelectItem>
            <SelectItem value="finished">I finished the course</SelectItem>
          </SelectContent>
        </Select>

        {status === "finished" && (
          <Button onClick={() => alert("Taking Quiz")} className="ml-4">
            Take Quiz
          </Button>
        )}
      </div>

      {/* Quiz Card (visible when "finished" is selected) */}
      {status === "finished" && (
        <Card>
          <CardHeader>
            <CardTitle>Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p>1. What is the main purpose of this course?</p>
                <select className="mt-2 p-2 border rounded w-full">
                  <option value="">Select an answer</option>
                  <option>Option A: To learn the basics</option>
                  <option>Option B: To become a pro</option>
                </select>
              </div>
              <div>
                <p>2. What is the recommended approach to follow the course?</p>
                <select className="mt-2 p-2 border rounded w-full">
                  <option value="">Select an answer</option>
                  <option>Option A: Watch videos only</option>
                  <option>Option B: Practice with each module</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
