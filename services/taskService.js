import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const addTaskToFirestore = async (task) => {
    try {
        const docRef = await addDoc(collection(db, "tasks"), task);
        return { id: docRef.id, ...task };
    } catch (error) {
        console.error("Error adding task: ", error);
        throw error;
    }
};

export const getAllTasks = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const tasks = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

export const updateTaskInFirestore = async (taskId, updatedTask) => {
    try {
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, updatedTask);
    } catch (error) {
        console.error("Error updating task: ", error);
        throw error;
    }
};

export const deleteTaskFromFirestore = async (taskId) => {
    try {
        const taskRef = doc(db, "tasks", taskId);
        await deleteDoc(taskRef);
    } catch (error) {
        console.error("Error deleting task: ", error);
        throw error;
    }
};