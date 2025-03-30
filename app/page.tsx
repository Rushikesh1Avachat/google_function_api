"use client"
import Form from "@/components/form/Forms"
import { useState, useEffect } from 'react'

export default function Home() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <>
     <Form/>
     <h1>{isClient ? 'This is never prerendered' : 'Prerendered'}</h1>

    </>

  );
}
