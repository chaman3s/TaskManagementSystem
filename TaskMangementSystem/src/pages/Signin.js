import React from 'react';

const Signin = () => {
  return (
    <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-center text-gray-700">Signin</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <button className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
          Signin
        </button>
      </form>
      <p className="text-center">
        No account yet?{' '}
        <a href="/signup" className="text-green-500 hover:underline">
          Signup
        </a>
      </p>
    </div>
  );
};

export default Signin;
