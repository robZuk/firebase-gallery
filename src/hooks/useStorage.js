import { useState, useEffect } from "react";
import { storage } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const { currentUser } = useAuth();
  const db = getFirestore();

  useEffect(() => {
    const storageRef = ref(storage, file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    const unsub = uploadTask.on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },

      (err) => {
        setError(err);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
          const createdAt = serverTimestamp();
          const newImageRef = doc(collection(db, "images"));
          setDoc(newImageRef, {
            url,
            createdAt,
            name: currentUser.displayName,
            id: newImageRef.id,
            likes: [],
            comments: [],
          });
        });
      }
    );
    return () => unsub();
  }, [file, db, currentUser.displayName]);

  return { progress, url, error };
};

export default useStorage;
