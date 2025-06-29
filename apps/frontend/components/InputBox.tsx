interface InputBox {
  label: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputBox({ label, placeholder, onChange }: InputBox) {
  return (
    <div>
      <div className="text-xl font-medium text-left py-2 text-white">{label}</div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-2 py-4  pr-40 border rounded border-slate-200 text-white bg-[#1e2124]"
      />
    </div>
  );
}
