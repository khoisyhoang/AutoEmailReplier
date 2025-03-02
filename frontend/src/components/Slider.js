import React from 'react';
import { Range } from 'react-daisyui';

export default function Mail() {
  return (
    <div>
      <Range min={0} max={100} step={1} value={0} />
    </div>
  );
}
