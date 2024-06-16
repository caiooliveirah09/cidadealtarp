export default function Input({ value, onChange, placeholder, type }: {
  value: string;
 onChange: (value: string) => void;
  placeholder: string;
  type: string;
}
) {
  return (
    <div className="relative mb-3" data-twe-input-wrapper-init>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />      
    </div>
  );
}
