import React from 'react';

const Signup = () => {
  return (
    <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-center text-gray-700">Signup</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <button className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-700">
          Signup
        </button>
      </form>
      <p className="text-center">
        Already have an account?{' '}
        <a href="/" className="text-blue-500 hover:underline">
          Signin
        </a>
      </p>
    </div>
  );
};

export default Signup;
