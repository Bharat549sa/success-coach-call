import { getCsrfToken, getProviders, getSession, signIn } from "next-auth/react";
import React from "react";

const signin = ({ providers }) => {
  return (
    <div className="bg-slate-900 h-screen py-10">
      <h1 className="text-white text-xl font-medium uppercase text-center">
        Signin
      </h1>
      <div className="bg-slate-800 w-4/12 mx-auto p-5 rounded-lg my-10 border-2 border-slate-700">
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="flex items-center my-10">
            <button
              onClick={() => signIn(provider.id)}
              className="bg-emerald-500 text-slate-100 w-64 items-center font-medium text-center flex mx-auto justify-center h-10 rounded-md"
            >
              {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default signin;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context),
    },
  };
}
