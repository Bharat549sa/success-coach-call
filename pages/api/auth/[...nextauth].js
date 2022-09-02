import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { initializeApp, getApps, getApp } from "firebase/app";

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId:
        "641378031380-2k6d1n84sn34nn7036onjbcbasfiaaqi.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  secret: process.env.SECRET,
  adapter: FirestoreAdapter({
    apiKey: "AIzaSyBLOD-YjzMIzjOZZbp3vBsi75M9EOnAZZU",
    authDomain: "test-call-6068d.firebaseapp.com",
    projectId: "test-call-6068d",
    storageBucket: "test-call-6068d.appspot.com",
    messagingSenderId: "641378031380",
    appId: "1:641378031380:web:86edf4cfb0abb62cd7d401"
  }),
});
