import { useEffect, useContext } from "react";
import { Context } from "../contexts/Context";

// Fetches data from the API
const useFetcher = url => {
  const [state, setState] = useContext(Context)
  useEffect(() => {
    fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error("Não foi possível carregar a cotação atual")
      }
    })
    .then((data, state) => {
      // Treating fetched data (exchange rate and date)
      let excRate = parseFloat(data.USD.ask)
      let dateObj = data.USD.create_date;
          dateObj = new Date(dateObj);
      let day = dateObj.getDate().toString();
      let month = dateObj.getMonth();
          month = (month + 1).toString();
      let year = dateObj.getFullYear().toString();
      let hh = dateObj.getHours().toString();
      let mm = dateObj.getMinutes();
          if (0 <= mm && mm <= 9) {
            mm = mm.toString();
            mm = "0" + mm;
          }

      let newDate = day + "/" + month + "/" + year + " " + hh + ":" + mm;
        setState({isLoading: false, exchangeRate: excRate, fetchedDate: dateObj, formattedDate: newDate});
      })
      .catch((error, state) => {
        setState({error: error, isLoading: false})
      })

  }, [])

  console.log("state fora do useEffect:",state);
}

//minimal working mockup
// const useFetcher = url => {
//   const [state, setState] = useContext(Context)
//   useEffect(() => {
//     setState(state => ({...state, isLoading: false}))
//     setState(state => ({...state, exchangeRate: 42}))
//   }, [])
//   console.log("state fora",state);
//   console.log("setState fora",setState);
// }



















// const useFetcher = url => {

//   // const context = useContext(Context) //working
//   const [state, setState] = useContext(Context)

//   // const [data, setdata] = React.useState([])
//   // const [isLoading, setIsLoading] = React.useState(false)
//   // const [error, setError] = React.useState(null)
//   console.log("state fora",state);
//   console.log("setState fora",setState);
  
//   useEffect(() => {
    
//     setState(state => ({...state, isLoading: false}))
//     setState(state => ({...state, exchangeRate: 42}))

//     //teste
//     // console.log("context:",context); //working

//     // setIsLoading(true);
//     // fetch(url)
//     //   .then(res => {
//     //     if (res.ok) {
//     //       return res.json();
//     //     } else {
//     //       throw Error("Não foi possível carregar a cotação atual")
//     //     }
//     //   })
//     //   .then(data => {
//     //     setdata(data);
//     //     setIsLoading(false)
//     //     console.log("data",data);
//     //     console.log("isLoading",isLoading);
//     //     console.log("error",error);
//     //   })
//     //   .catch(error => {
//     //     setError(error)
//     //   })
//   }, [])

  
//   // return { context } //working
// }

export default useFetcher;
