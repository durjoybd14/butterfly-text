import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    const loading = toast.loading("Loading...");

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        //TODO:Handle Percentage
        (error) => {
          setErr(true);
          toast.dismiss(loading);
          toast.error("Failed to create account!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            toast.dismiss(loading);
            toast.success("Welcome to ButterFly");
            navigate("/");
          });
        }
      );
    } catch (err) {
      setErr(true);
      toast.dismiss(loading);
      toast.error("Failed to create account!");
    }
  };

  return (
    <div className="formContainer">
      <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-center text-xl font-medium text-gray-900 dark:text-white">
            Create an account to ButterFly
          </h5>
          <div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="display name"
              required
            />
          </div>
          <div>
            <input
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="********"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="default_size"
            >
              Choose an image
            </label>
            <input
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="default_size"
              type="file"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Signup
          </button>
          <div className="text-center text-sm font-medium text-red-500 dark:text-red-300">
            {err && <span>Something went wrong</span>}
          </div>
          <div className="text-center text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { auth, db, storage } from "../firebase";
// import Add from "../img/addAvatar.png";

// const Register = () => {
//   const [err, setErr] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const displayName = e.target[0].value;
//     const email = e.target[1].value;
//     const password = e.target[2].value;
//     const file = e.target[3].files[0];

//     try {
//       //Create user
//       const res = await createUserWithEmailAndPassword(auth, email, password);

//       const storageRef = ref(storage, displayName);

//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         //TODO:Handle Percentage
//         (error) => {
//           setErr(true);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             //Update profile
//             await updateProfile(res.user, {
//               displayName,
//               photoURL: downloadURL,
//             });
//             //create user on firestore
//             await setDoc(doc(db, "users", res.user.uid), {
//               uid: res.user.uid,
//               displayName,
//               email,
//               photoURL: downloadURL,
//             });

//             //create empty user chats on firestore
//             await setDoc(doc(db, "userChats", res.user.uid), {});
//             navigate("/");
//           });
//         }
//       );
//     } catch (err) {
//       setErr(true);
//     }
//   };

//   return (
//     <div classNameName="formContainer">
//       <div classNameName="formWrapper">
//         <span classNameName="logo">ButterFly</span>
//         <span classNameName="title">Register</span>
//         <form onSubmit={handleSubmit}>
//           <input type="text" placeholder="display name" />
//           <input type="email" placeholder="email" />
//           <input type="password" placeholder="password" />
//           <input style={{ display: "none" }} type="file" id="file" />
//           <label htmlFor="file">
//             <img src={Add} alt="" />
//             <span>Add an avatar</span>
//           </label>
//           <button>Sign up</button>
//           {err && <span>Something went wrong</span>}
//         </form>
//         <p>
//           You do have an account? <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
