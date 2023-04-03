import { ReactNode, createContext, useEffect, useState } from "react";

interface UserContextType {
    reload: boolean;
    setReload: (newState: boolean) => void;
}

interface UserContextProps {
    children: ReactNode;
}

const initialValue = {
    reload: false,
    setReload: () => { }
}

export const Context = createContext<UserContextType>(initialValue);

export const Provider = ({ children }: UserContextProps) => {

    const [reload, setReload] = useState(initialValue.reload)

    return (
        <Context.Provider value={{ reload, setReload }}>
            {children}
        </Context.Provider>
    )
}