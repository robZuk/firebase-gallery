import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const useFirestore = (images) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, images), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
      setLoading(false);
    });

    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [images, loading]);

  return { docs, loading };
};

export default useFirestore;
