import { useEffect, useState } from "react";
import db from "./firebase/firebase-config";
import {
    addDoc,
    doc,
    collection,
    getDocs,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

function AppFirebase() {
    const divStyle = {
        padding: "20px",
        backgroundColor: "#eeeeee99",
        borderRadius: "6px",
        width: "450px",
        margin: "10px",
    };

    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
    const [users, setUsers] = useState();

    const usersCollectionRef = collection(db, "users");

    const createUser = async () => {
        await addDoc(usersCollectionRef, { name: newName, age: newAge });
        setNewAge(0);
        setNewName("");
    };

    const updateUser = async (id, age) => {
        const newData = { age };
        const userRef = doc(db, "users", id);
        await updateDoc(userRef, newData);
    };

    const deleteUser = async id => {
        const userRef = doc(db, "users", id);
        await deleteDoc(userRef);
    };

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        getUsers();
    }, []);

    return (
        <div>
            <div style={divStyle} className="form">
                <input
                    type="text"
                    name="newName"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                />
                <input
                    type="number"
                    name="newAge"
                    value={newAge}
                    onChange={e => setNewAge(Number(e.target.value))}
                />
                <button onClick={createUser}>Create New User</button>
            </div>
            <div>
                {users &&
                    users.map(user => {
                        return (
                            <div key={user.id} style={divStyle}>
                                <h3>Name: {user.name}</h3>
                                <p>Age: {user.age}</p>
                                <button
                                    onClick={() =>
                                        updateUser(user.id, user.age + 1)
                                    }
                                >
                                    (+) Age
                                </button>
                                <button onClick={() => deleteUser(user.id)}>
                                    Delete User
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default AppFirebase;
