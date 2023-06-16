"use client"
import { Client, Databases, ID } from "appwrite";
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('648c417e8c839efe4160');

export default function Home() {

  const [blogPosts, setblogPosts] = useState([])

  useEffect(() => {
    document.title = "Home: The Hunting Coder"
    const databases = new Databases(client);

    let promise = databases.listDocuments(
      "648c44ed8e185295657f", "648c44f74bda7030ca99",
    );

    promise.then(function (response) {
      console.log(response);
      setblogPosts(response.documents)
    }, function (error) {
      console.log(error);
    });
  }, [])


  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white p-4 shadow-md">
            <img src={post.image} alt={post.title} className="w-full h-40 object-cover mb-4" />
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-700">{post.metadesc}...</p>
            <Link href={'/blog/${post.slug}'} className='mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
              Read More
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
