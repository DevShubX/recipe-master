import axios from 'axios';
import { ExternalLink, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
const HomePage = () => {
  const [recipes, setRecipes] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    getRecipes();
  },[]);

  const getRecipes = async () => {
    setIsLoading(true);
    const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=20`);
    setRecipes(response.data.recipes);
    setIsLoading(false);
  }

  return (
    <div className='my-10 text-center'>
      <h1 className='text-[40px] font-bold mb-5'>
        Recipe Master
      </h1>
      <div className='w-full flex items-center justify-center'>
        {isLoading && (
          <div className='w-full flex items-center justify-center '>
            <Loader2 className='animate-spin w-[100px] h-[100px] mt-[350px]'/>
          </div>
        )}
        {!isLoading && (
          <div className='w-2/3 flex flex-col gap-y-10'>
            {recipes.map((recipe: any) => (
              <div key={recipe.id} className='flex border border-slate-300 p-3 rounded-[10px]'>
                <img src={recipe.image} alt="pic" className='w-[300px] h-[250px] object-cover rounded-[15px] shadow-lg' />
                <div className='ml-10'>
                  <Link to={`/details/${recipe.id}`} className='mt-3 mb-5 text-[22px] line-clamp-1 font-semibold text-green-500 flex items-center gap-x-2'>
                    {recipe.title} <ExternalLink />
                  </Link>
                  <div dangerouslySetInnerHTML={{ __html: recipe.summary }} className='line-clamp-[9] text-start' />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage