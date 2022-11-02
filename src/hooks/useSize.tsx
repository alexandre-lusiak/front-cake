import React, {  useEffect, useState } from 'react'

  function useResize () {

  
    const [windowSize , setWindowSize] = useState({
        width:0,
        height:0
    }) 

    useEffect(() => {
        function handleResize (){
            setWindowSize({
               width: window.innerWidth,
                height: window.innerHeight   
            }
              
            )
            
        }

        window.addEventListener('resize',handleResize)
    }, []);

// console.log('Size',windowSize);

    return windowSize;
}


export default useResize;