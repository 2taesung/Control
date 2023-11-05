import React from 'react';

const LABEL_MAP: Record<string, string> = {
  setTemp: '온도',
  setVentilateCtrlDefro: '제상시송풍제어',
  setHum: '습도',
  status: '상태',
};
const TYPE_MAP: Record<string, string> = {
  setTemp: 'number',
  setVentilateCtrlDefro: 'checkbox',
  setHum: 'number',
  status: 'checkbox',
};

export default function InputField({
  target,
  machineData,
  handleInput,
}: {
  target: string;
  machineData: Map<string, string>;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const isCheckbox = TYPE_MAP[target] === 'checkbox';

  return (
    <div>
      <p>{LABEL_MAP[target]}</p>
      <input
        name={target}
        type={TYPE_MAP[target]}
        value={isCheckbox ? undefined : machineData.get(target) || ''}
        checked={isCheckbox ? Boolean(machineData.get(target)) : undefined}
        onChange={handleInput}
      />
    </div>
  );
}
