import React, { useEffect } from "react";

const useFetcher = url => {
  const [apiData, setApiData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  
  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("Não foi possível carregar a cotação atual")
        }
      })
      .then(apiData => {
        setApiData(apiData);
        setIsLoading(false)
      })
      .catch(error => {
        setError(error)
      })
  }, [url])

  console.log("apiData",apiData);
  console.log("isLoading",isLoading);
  console.log("error",error);
  
  return { apiData, isLoading, error }
}

export default useFetcher;
