import { useState } from "react";
import { Shield, LogIn } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm animate-fade-in">
        <CardHeader className="text-center space-y-4 pb-2">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold">DIFC Login</h1>
            <p className="text-sm text-muted-foreground">Digital Infrastructure & Fund Control</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="user@difc.gov.in" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button className="w-full">
            <LogIn className="h-4 w-4 mr-2" />
            Sign In
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Contact your administrator for access
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
