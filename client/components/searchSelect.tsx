import  { useState, useEffect, useRef } from 'react';

interface SearchSelectProps {

    value: string;
    placeholder?: string;
    options: string[]
    onChange: (newValue: any) => void;
    inputClass:string;

}

export default function SearchSelect({ options, value, onChange, placeholder,inputClass }: SearchSelectProps) {


    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const autoCompleteRef = useRef<HTMLDivElement | null>(null);
    const filteredItems = options.filter(item =>
        item.toLowerCase().startsWith(search.toLowerCase())
    );
    const handleChange = (value: string) => {
        const newValue = value;
        onChange(newValue);
    };



    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (autoCompleteRef.current && !autoCompleteRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="w-full relative bg-inherit rounded-full z-30 text-inderit " ref={autoCompleteRef}>



            {open && (
                <ul
                    onClick={() => setOpen(!open)}
                    className="w-[300px] text-inherit min-h-[200px]  absolute top-[60px] max-h-[500px] h-[200px]   mt-2   rounded shadow-lg z-70  overflow-y-auto bg-inherit"
                >
                    {filteredItems.map(item => (
                        <li
                            key={item}
                            className="w-full text-inherit rounded-xl p-4 mt-2 hover:bg-gray-500 "
                            onClick={() => { handleChange(item) }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}

            <input
                onClick={() => setOpen(!open)}
                type="search"
                value={value}
                autoComplete="off"
                onChange={(e) => { setOpen(true); setSearch(e.target.value); handleChange(e.target.value) }}
                placeholder={placeholder}
                className={inputClass}
            />


        </div>
    )

}