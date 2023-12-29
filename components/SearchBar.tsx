"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'


const isValidAmazonProductURL = (url:string) =>{
  try{
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if(hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon'))
    {
      return true;
    }
  }
  catch{

  }
}

const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) =>{
      event.preventDefault();
      const isValidLink = isValidAmazonProductURL(searchPrompt);
      if(!isValidLink)
      {
        return  alert("Please provide a valid URL");

      }
      try{
        setIsLoading(true);

        // Scrape the product here: 
        const product = await scrapeAndStoreProduct(searchPrompt);
      }
      catch(err)
      {
        console.log(err);
      }
      finally{
        setIsLoading(false);
      }
    }
  return (
    <form action="" className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter product link' className='searchbar-input' value={searchPrompt} onChange={(e)=>setSearchPrompt(e.target.value)}/>

        <button disabled = {searchPrompt === ""} type='submit' className='searchbar-btn'>{isLoading? 'Searching...' : "Search"}</button>
    </form>
  )
}

export default SearchBar
