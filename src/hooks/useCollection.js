import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "../firebase/firebase-config";

export const useCollection = c => {
    const [document, setDocument] = useState(null);

    useEffect(() => {
        let ref = collection(db, c);

        const unsub = onSnapshot(ref, snapshot => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id });
            });
            setDocument(results);
        });
        return () => unsub();
    }, [c]);

    return { document };
};
