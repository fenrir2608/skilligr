import React, { useState } from "react";
import GridBackground from "../components/ui/grid";
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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import Spinner from "../components/Spinner";



const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { authStatus, loading } = useAuth();
  if (loading) return <Spinner/>;

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message);
      } else {
        // Handle error
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <GridBackground>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Forgot Password?</CardTitle>
            <CardDescription>
              Enter your email to receive a password reset link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReset}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    tabIndex="1"
                    id="email"
                    type="text"
                    placeholder="Your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button tabIndex="3" type="submit" className="w-full">
                  Reset
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Back to{"  "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </GridBackground>
  );
};

export default ForgotPassword;
