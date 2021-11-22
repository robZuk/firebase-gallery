import {
  arrayRemove,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";

async function deleteComment(comment, imageRef) {
  await updateDoc(imageRef, {
    comments: arrayRemove(comment),
  });
}

async function addComment(comment, imageRef, currentUser) {
  await updateDoc(imageRef, {
    comments: arrayUnion({
      comment: comment,
      createdAt: Timestamp.now(),
      name: currentUser.displayName,
      userId: currentUser.uid,
    }),
  });
}

async function deleteLike(imageRef, currentUser) {
  await updateDoc(imageRef, {
    likes: arrayRemove(currentUser.uid),
  });
}

async function addLike(imageRef, currentUser) {
  await updateDoc(imageRef, {
    likes: arrayUnion(currentUser.uid),
  });
}

export { deleteComment, addComment, addLike, deleteLike };
