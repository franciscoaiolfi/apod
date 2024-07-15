"use client";

import React, { useEffect, useState } from "react";

interface ApodData {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version?: string;
  title: string;
  url: string;
}

interface ApodProps {
  date: string;
}


const Apod: React.FC<ApodProps> = ({ date }) => {
  const [data, setData] = useState<ApodData | null>(null);
  const [error, setError] = useState<string | null>(null);





  useEffect(() => {
    const fetchData = async () => {
      const api_key = process.env.NEXT_PUBLIC_API_KEY_APOD;
      try {
        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        const result = await res.json();
        setData(result);
        setError(null);
      } catch (error) {
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setData(null);
        setError(errorMessage);
      }
    };

    fetchData();
  }, [date]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const { explanation, media_type, title, url } = data;
  const limitText = explanation.substring(0, 250) + "...";

  return (
    <div className="apod-content-wrapper">
      <h1>{title}</h1>
      <p>{date}</p>
      <p>{limitText}</p>
      <div>
        {media_type === "image" && <img src={url} alt={title} />}
        <a href={url} target="_blank">
          <button>See Original</button>
        </a>
      </div>
    </div>
  );
};

export default Apod;
