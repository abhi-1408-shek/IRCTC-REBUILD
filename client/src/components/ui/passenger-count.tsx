import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface PassengerCountProps {
  value: number;
  onChange: (value: number) => void;
}

export function PassengerCount({ value, onChange }: PassengerCountProps) {
  const increment = () => {
    if (value < 6) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={decrement}
        disabled={value <= 1}
        className="h-10 w-10"
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        min={1}
        max={6}
        value={value}
        onChange={(e) => {
          const val = parseInt(e.target.value);
          if (!isNaN(val) && val >= 1 && val <= 6) {
            onChange(val);
          }
        }}
        className="w-20 text-center"
      />
      <Button
        variant="outline"
        size="icon"
        onClick={increment}
        disabled={value >= 6}
        className="h-10 w-10"
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
