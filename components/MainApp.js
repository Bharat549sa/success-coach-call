import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  collection,
  getDocs,
  addDoc,
  query,
  deleteDoc,
  doc,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase";
import Image from "next/image";

const MainApp = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");

  const handleClickAdd = async () => {
    await addDoc(collection(db, "posts"), {
      name: session.user.name,
      email: session.user.email,
      message: input,
      timestamp: Date.now(),
      image: session.user.image,
    }).then(() => {
      read();
      setInput("");
    });
  };

  const read = async () => {
    // const data = collection(db, "test");
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc")  );

    const querySnapshot = await getDocs(q);
    const datalist = querySnapshot.docs.map((doc) => {
      return doc;
    });
    console.log(datalist);
    setPosts(datalist);
  };

  useEffect(() => {
    read();
  }, [db]);

  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id)).then(() => {
      read();
    });
  };

  return (
    <div className="flex flex-col space-y-12 max-w-xl mx-auto  items-center">
      <div className="flex w-full items-center space-x-5">
        <textarea
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Enter a message..."
          className="flex-1 rounded-md p-2 outline-none max-h-14 bg-slate-800 text-white border-2 border-slate-900 focus:border-slate-600"
        />
        <button
          className="bg-emerald-400 h-fit py-2 px-5 rounded-md text-white font-medium"
          onClick={handleClickAdd}
        >
          Post
        </button>
      </div>
      <div className="min-w-[35rem] max-h-[30rem] overflow-y-scroll">
        {posts.map((post) => {
          return (
            <div key={post.id} className="flex flex-col mx-5 bg-slate-800 min-w-[35rem] my-5 p-5 hover:brightness-110 border-2 border-slate-700 rounded-lg">
              <div className="flex items-center justify-between">
                <Image
                  src={post.data().image}
                  width={35}
                  height={35}
                  className="rounded-full"
                />
                <p className="font-semibold text-sm">{post.data().name}</p>
              </div>
              <div className="my-3">
                <p>{post.data().message}</p>
              </div>
              {post.data().email === session.user.email && (
                <button
                  onClick={() => {
                    deletePost(post.id);
                  }}
                  className="bg-red-500/70 hover:bg-red-500/90 ml-auto min-w-[5rem] py-2 rounded-md text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainApp;
