import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GridBackground from "../components/ui/grid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import Spinner from "../components/Spinner";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [dept, setDept] = useState("");
  const [rollNo, setRollNo] = useState("");
  const navigate = useNavigate();
  const {authStatus,loading} = useAuth();
  if (loading) return Spinner;

  const handleSignup = async (e) => {
    e.preventDefault();
    const fullName = `${firstName} ${lastName}`;
    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          full_name: fullName,
          contact_no: contactNo,
          dept,
          roll_no: rollNo,
        }),
      });
      if (response.ok) {
        navigate("/landing");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  return (
    <GridBackground>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup}>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Your username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* First Name and Last Name in the same row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      placeholder="Your first name"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      placeholder="Your last name"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="contact-no">Contact No</Label>
                  <Input
                    id="contact-no"
                    placeholder="Your contact number"
                    required
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                </div>
                {/* Roll No and Department in the same row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="roll-no">Roll No</Label>
                    <Input
                      id="roll-no"
                      placeholder="Your roll number"
                      required
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dept">Department</Label>
                    <Select required onValueChange={(value) => setDept(value)}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Choose a department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-science">
                          Computer Science
                        </SelectItem>
                        <SelectItem value="mechanical">Mechanical</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="civil">Civil</SelectItem>
                        <SelectItem value="chemical">Chemical</SelectItem>
                        <SelectItem value="biomedical">Biomedical</SelectItem>
                        <SelectItem value="aerospace">Aerospace</SelectItem>
                        <SelectItem value="environmental">
                          Environmental
                        </SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="materials">Materials</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </GridBackground>
  );
}
