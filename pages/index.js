import { useSession, signIn, signOut } from "next-auth/react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { useState } from "react";
import MainApp from "../components/MainApp";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  const [userData, setUserData] = useState();

  // const handleClick = async (email) => {
  //   // const data = collection(db, "test");
  //   const q = query(collection(db, "users"), where("email", "==", email));

  //   const querySnapshot = await getDocs(q);
  //   const datalist = querySnapshot.docs.map((doc) => doc.data());
  //   setUserData(datalist);
  // };

  const handleClickSub = async () => {
    await addDoc(collection(db, "test"), {
      name: "Felix",
    });
  };

  const { data: session } = useSession();
  if (session) {
    return (
      <div className="p-5 bg-slate-900 h-screen text-white">
        <Head>
          <title>Home</title>
        </Head>
        <div className="flex w-full items-center justify-between">
          <button
            className="bg-red-400 py-2 px-5 rounded-md text-white font-medium"
            onClick={() => signOut()}
          >
            Sign out
          </button>
          <div className="flex items-center">
            <h2 className="px-5">Hi {session.user.name}</h2>
            <Image
              src={session.user.image}
              className="rounded-full"
              width={35}
              height={35}
            />
          </div>
        </div>
        <MainApp />
      </div>
    );
  } else {
    return (
      <div className="p-5 bg-slate-900 h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-white text-xl font-medium uppercase text-center my-10">Please Sigin in To use App</h2>
        <button
        onClick={() => signIn()}
          className="bg-emerald-500 min-w-[24rem] mx-auto h-fit py-2 px-5 rounded-md text-white font-medium"
        >
          Sign in
        </button>
      </div>
    );
  }
}
