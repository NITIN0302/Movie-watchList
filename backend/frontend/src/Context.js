import {useContext,createContext} from 'react';

export const CounterContext = createContext({
    user:"Login",
    userMail:"",
    setUserMovie:()=>{},
    isModalOpen:false,
    openModal:()=>{},
    closeModal:()=>{},
    setUserName:()=>{},
    setUserEmail:()=>{}
})

export const CounterProvider = CounterContext.Provider

export default function useCounterContext()
{
    return useContext(CounterContext)
}