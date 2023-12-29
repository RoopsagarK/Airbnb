import { useContext } from "react"
import { UserContext } from "../UserContext"

export default function AccountPage() {
    const {user} = useContext(UserContext);
    return (
        <>
            <h1>This is the account page of {user.name}</h1>
        </>
    )
}