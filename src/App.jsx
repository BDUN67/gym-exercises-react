import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() =>{
    setTimeout(()=>{

      setList([
        {id: 1, title: 'жим ', weight: 100},
        {id: 2, title: 'жим 90кг', weight: 100}
        
      ])

      setIsLoading(false);
      console.log('Данні завантаженно')
    }, 2000);
  }, []);

  
   return(
    <div>
      <h1>PowerLog: мій прогрес</h1>
      {isLoading ? <p>Завантаження...</p> : <p>Список Вправ:</p>}
      
       <ul>
       {list.map((item) => (
       

          <li key={item.id}> {item.title} </li>
        ))} 
        </ul>
      
    </div>
   ); 
  
}


export default App;
