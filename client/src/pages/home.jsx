import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
const Home = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let[loading,setloading] = useState(false)
  const navigate = useNavigate();
  let[alreadydone,setalreadydone] = useState(false)
  const onSubmit = async (data) => {
    try {
      setloading(true);
      if (localStorage.getItem("assunipro") !== "true" || !localStorage.getItem("assunipro")) {
        const response = await axios.post('http://localhost:3000/post', data);
        localStorage.setItem("assunipro", "true");
        setalreadydone(true);
      } else {
        setalreadydone(true); 
      }
  
      setloading(false);
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">For Assignment</h2>
        <p className=" font-semibold text-center mb-6">pleas submit carefully because you can only submit it one time </p>
        { 
        alreadydone ||localStorage.getItem("assunipro") === "true" ?<h1 className="text-white text-center mb-6">Thank you for submitting</h1>:
          <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-8 rounded-lg shadow-lg">
          {/* City Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">City Name</label>
            <input
              type="text"
              {...register('city', { required: true })}
              placeholder="Enter your city"
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.city && <span className="text-red-500 text-sm">City name is required</span>}
          </div>

          {/* Gender Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Gender</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input type="radio" value="Male" {...register('gender', { required: true })} className="mr-2" />
                Male
              </label>
              <label className="flex items-center">
                <input type="radio" value="Female" {...register('gender', { required: true })} className="mr-2" />
                Female
              </label>
            </div>
            {errors.gender && <span className="text-red-500 text-sm">Gender is required</span>}
          </div>

          {/* Section Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Section</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input type="radio" value="E1" {...register('section', { required: true })} className="mr-2" />
                E1
              </label>
              <label className="flex items-center">
                <input type="radio" value="E2" {...register('section', { required: true })} className="mr-2" />
                E2
              </label>
            </div>
            {errors.section && <span className="text-red-500 text-sm">Section is required</span>}
          </div>
          {/* studied */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Studied</label>
            <div className="flex  items-center space-x-4">
              <label className="flex items-center">
                <input type="radio" value="ics" {...register('studied', { required: true })} className="mr-2" />
                ics
              </label>
              <label className="flex items-center">
                <input type="radio" value="pre-eng" {...register('studied', { required: true })} className="mr-2" />
               pre-eng
              </label>
              <label className="flex items-center">
                <input type="radio" value="pre-medical" {...register('studied', { required: true })} className="mr-2" />
                pre-med
              </label>
              <label className="flex items-center">
                <input type="radio" value="others" {...register('studied', { required: true })} className="mr-2" />
                others
              </label>
            </div>
            {errors.studied && <span className="text-red-500 text-sm"> required</span>}
          </div>
          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
           { loading? "Loading":"Submit"}
          </button>
          
        </form>}
        <button onClick={()=>{
          navigate('/charts')
        }}  className="w-full bg-blue-600 hover:bg-blue-700 mt-4 text-white font-semibold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            See Results
          </button>
      </div>
    </div>
  );
};

export default Home;
