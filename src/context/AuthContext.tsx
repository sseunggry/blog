import {ReactNode, createContext,useEffect, useState} from "react";
import {app} from "firebaseApp";
import {User, getAuth, onAuthStateChanged} from "firebase/auth";

interface AuthProps {
    children: ReactNode;
}

const AuthContext = createContext({
   user: null as User | null
});

export const AuthContextProvider = ({children} : AuthProps) => {
    const auth = getAuth(app);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setCurrentUser(user);
            } else{
                setCurrentUser(user);
            }
        });
    }, [auth]);
    
    return (
        <AuthContext.Provider value={{ user: currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
