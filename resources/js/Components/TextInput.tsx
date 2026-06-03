import React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isFocused?: boolean;
}

export default forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => localRef.current as HTMLInputElement);

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'px-4 py-1 rounded-full border-green-600 shadow-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600 bg-green-100 ' +
                className
            }
            ref={localRef}
        />
    );
});
