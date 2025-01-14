import axios from 'axios';
import { CircleUserRoundIcon, ClockIcon, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const DetailsPage = () => {
  const recipeId = useParams().id;

  const [recipeInfo, setRecipeInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getRecipeInfo();

  }, [recipeId]);

  const getRecipeInfo = async () => {
    setIsLoading(true);
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
    setRecipeInfo(response.data);
    setIsLoading(false);
  }

  return (
    <div className='bg-green-200 w-full flex items-start justify-center'>
      {isLoading && (
        <div className='w-full flex items-center justify-center '>
          <Loader2 className='animate-spin w-[100px] h-[100px] mt-[350px]' />
        </div>
      )}
      {!isLoading && (
        <div className='bg-white p-10 my-[50px] rounded-[15px] w-[800px] max-w-[800px]'>
          <img src={recipeInfo.image} alt="pic" className='w-[700px] h-[300px] object-cover rounded-[15px] shadow-lg' />
          <h1 className='font-semibold text-[30px] mt-5 '>
            {recipeInfo.title}
          </h1>
          <div className='mt-5 flex gap-x-3 items-center'>
            <ClockIcon className='w-5 h-5' />{recipeInfo.readyInMinutes} Minutes
          </div>
          <div className='mt-5 flex gap-x-3 items-center'>
            <CircleUserRoundIcon className='w-5 h-5' />{recipeInfo.servings} Servings
          </div>
          <div dangerouslySetInnerHTML={{ __html: recipeInfo.summary }} className='mt-5' />
          <div className='p-5 bg-green-100 rounded-xl mt-5'>
            <h1 className='font-semibold text-3xl text-green-500'>
              Ingredients
            </h1>
            <ul className='flex flex-col gap-y-2 text-lg mt-5 font-thin list-disc ml-5'>
              {recipeInfo?.extendedIngredients?.map((item: any, index: number) => (
                <li className='capitalize'>
                  {item.originalName}
                </li>
              ))}
            </ul>
          </div>
          <h1 className='mt-5 font-semibold text-3xl text-green-500'>
            Instructions
          </h1>
          <ul className='flex flex-col gap-y-2 text-lg mt-5 font-light list-decimal ml-5'>
            {recipeInfo?.analyzedInstructions && recipeInfo?.analyzedInstructions[0]?.steps?.map((item: any, index: number) => (
              <li className='capitalize '>
                {item.step}
              </li>
            ))}
          </ul>

        </div>)}
    </div>
  )
}

export default DetailsPage
