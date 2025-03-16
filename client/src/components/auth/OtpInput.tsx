import { OTPInput, OTPInputContext } from "input-otp";
import { useContext } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
}

const Slot = ({ char, hasFakeCaret }: { char: string | null; hasFakeCaret: boolean }) => {
  return (
    <div
      className={cn(
        "relative w-10 h-12 text-center text-2xl font-semibold border rounded bg-white",
        "focus:border-primary focus:ring-1 focus:ring-primary",
        hasFakeCaret && "animate-fake-caret"
      )}
    >
      {char}
    </div>
  );
};

const SlotSeparator = () => <div className="w-2" />;

export function OtpInput({ value, onChange }: OtpInputProps) {
  return (
    <OTPInput
      value={value}
      onChange={onChange}
      maxLength={6}
      containerClassName="flex items-center justify-center gap-2"
      render={({ slots }) => (
        <>
          <div className="flex">
            {slots.slice(0, 3).map((slot, idx) => (
              <div key={idx}>
                <Slot {...slot} />
                {idx !== 2 && <SlotSeparator />}
              </div>
            ))}
          </div>

          <div className="mx-2 w-5 h-2 bg-muted rounded" />

          <div className="flex">
            {slots.slice(3).map((slot, idx) => (
              <div key={idx}>
                <Slot {...slot} />
                {idx !== 2 && <SlotSeparator />}
              </div>
            ))}
          </div>
        </>
      )}
    />
  );
}