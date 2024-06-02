import {app} from "firebaseApp";
import {getAuth, signOut} from "firebase/auth";
import {toast} from "react-toastify";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";

export default function ProFile(){
    const {user} = useContext(AuthContext);
    
    const onClick = async () => {
        try {
            const auth = getAuth(app);
            await signOut(auth);
            toast.success("로그아웃 되었습니다.");
        } catch(error) {
            console.log(error);
        }
    };
    
    return (
        <section className="profile__box">
            <div className="profile__image" />
            <div className="profile__email">{user?.email}</div>
            <div className="profile__name">{user?.displayName || "사용자"}</div>
            <div role="presentation" className="profile__logout" onClick={onClick}>로그아웃</div>
        </section>
    )
}