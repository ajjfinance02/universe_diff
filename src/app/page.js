"use client"
import Image from "next/image";
import Loader from "@/components/Loader/Loader";
import Universal from "@/components/Universal/Universal";
import { useEffect, useState, Fragment } from "react";


export default function Home() {


  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  return (
    <Fragment>

      {loading ? <Loader /> : <Universal />}

    </Fragment>

  );
}
