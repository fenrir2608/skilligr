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
import Spinner from "../components/Spinner";
import { useAuth } from "../hooks/auth";

const UpdatePassword = () => {
  const [NewPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { authStatus, loading } = useAuth();
  if (loading) return <Spinner/>;
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("tk");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/reset", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          token: token,
          newPassword: NewPassword,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message);
        navigate("/login");
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
            <CardTitle className="text-2xl">Set a new password</CardTitle>
            <CardDescription>Enter your New Password.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReset}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="NewPassword">New Password</Label>
                  <Input
                    tabIndex="1"
                    id="NewPassword"
                    type="text"
                    placeholder="Your New Password"
                    required
                    value={NewPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

export default UpdatePassword;
