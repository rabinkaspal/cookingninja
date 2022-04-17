import db from "./firebase-config";

import {
addDoc,
doc,
collection,
getDocs,
updateDoc,
deleteDoc,
} from "firebase/firestore";

// adding doc
addDoc(usersCollectionRef, { name: newName, age: newAge });

//getting reference to a doc
const userDocRef = doc(db, "users", id);
addDoc(userDocRef, {...user, age: age+1})

deleteDoc(userDocRef);

userCollectionsRef = collection(db, "users")
data = getDocs(usersCollectionRef)
data.docs[0].data() gives the data stored at node
doc.id gives id of the document
