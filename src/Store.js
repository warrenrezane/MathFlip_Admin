import { createStore, action, thunk, persist } from "easy-peasy";
import { firestore, auth } from "./Firebase/config";
import { CustomStorage } from "./CustomStorage";

export const store = createStore(
  persist(
    {
      user: null,
      sections: null,
      studentUids: null,

      // User
      setUser: action((state, payload) => {
        state.user = payload;
      }),

      // Sections
      setSection: action((state, payload) => {
        state.sections = payload;
      }),
      fetchSections: thunk(async (action, payload, helpers) => {
        const { user, sections } = helpers.getState();

        try {
          const data = [];
          const studentUidData = [];

          const snapshot = await firestore
            .collection("sections")
            .where("teacher_uid", "==", user.uid)
            .get();

          snapshot.docs.forEach((doc) => {
            const temp = { ...doc.data(), id: doc.id };
            data.push(temp);
          });

          data.forEach((section) => {
            section.students.forEach((student) => {
              studentUidData.push(student);
            });
          });

          action.setSection(data);
          action.setStudentUid(studentUidData);
        } catch (err) {
          console.log(err);
        }
      }),

      // StudentUidList
      setStudentUid: action((state, payload) => {
        state.studentUids = payload;
      }),

      // Firebase Auth
      login: thunk(async (action, payload, helpers) => {
        const emailServer = "@mathflip-e24a1.firebaseapp.com";

        try {
          const credential = await auth().signInWithEmailAndPassword(
            `adminteacher${emailServer}`,
            "adminteacher"
          );

          action.setUser(credential.user);
          await action.fetchSections();
        } catch (err) {
          console.log(err);
        }
      }),
      refresh: thunk(async (action, payload, helpers) => {
        await action.fetchSections();
      }),
      logout: thunk(async (action, payload, helpers) => {
        try {
          await auth().signOut();
          action.setUser(null);
          action.setSection(null);
          action.setStudentUid(null);
        } catch (err) {
          console.log(err);
        }
      }),
    },
    { storage: CustomStorage }
  )
);
