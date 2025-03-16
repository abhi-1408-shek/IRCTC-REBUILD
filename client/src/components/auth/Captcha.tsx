import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface CaptchaProps {
  value: string;
  onChange: (value: string) => void;
}

export function Captcha({ value, onChange }: CaptchaProps) {
  const [captchaText, setCaptchaText] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="space-y-2">
      <Label htmlFor="captcha">Enter Captcha</Label>
      <div className="flex items-center gap-4">
        <div 
          className="min-w-[120px] h-12 bg-gray-100 flex items-center justify-center 
                     font-mono text-lg tracking-wider select-none"
          style={{
            background: "repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #e5e5e5 10px, #e5e5e5 20px)"
          }}
          role="img"
          aria-label="CAPTCHA image"
        >
          {captchaText}
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={generateCaptcha}
          aria-label="Refresh captcha"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Input
          id="captcha"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
          placeholder="Enter the text shown above"
          aria-label="Enter captcha text"
        />
      </div>
    </div>
  );
}
