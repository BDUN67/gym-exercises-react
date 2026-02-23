import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [list, setList] = useState(() => {
    const saved = localStorage.getItem('power-log-data');
    return saved ? JSON.parse(saved) : []; 
  });
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');



  useEffect(() =>{
    setTimeout(()=>{

      setList([
        {id: 1, title: 'жим ', weight: 100},
        {id: 2, title: 'присяд ', weight: 140}
        
      ])

      setIsLoading(false);
      console.log('Данні завантаженно')
    }, 2000);
  }, []);

  useEffect(() =>{
    localStorage.setItem('power-log-data', JSON.stringify(list));
  }, [list]); //спрацьовує коли додали або видалили вправу
  const addWorkout = () => {
    // 1. Перевірка: не додаємо порожню вправу (валідація)
    if(title.trim() === '') return;

    // 2. Створюємо об'єкт нової вправи
    const newWorkout = {
    id: Date.now(),      // Генеруємо унікальний ID
    title: title,        // Значення з інпута "Назва"
    weight: Number(weight), // Перетворюємо рядок на число
    reps: Number(reps)      // Перетворюємо рядок на число
    }

    // 3. Оновлюємо список: копіюємо старі дані + додаємо нову вправу
  setList([...list, newWorkout]);

  // 4. "Скидаємо" форму (очищаємо інпути)
  setTitle('');
  setWeight('');
  setReps('');
  }

  const removeWorkout = (id) =>{
    // Створюємо новий масив, у якому залишаються тільки ті, чий ID НЕ збігається з видаленим
    const newList = list.filter(item => item.id !== id);

    //оновлюємо наш стейт новим "чистим" масивом
    setList(newList); 
  }

  
   return(
    <div>
      <h1>PowerLog: мій прогрес</h1>
      {isLoading ? <p>Завантаження...</p> : <p>Список Вправ:</p>}
      

      <input
       type="text"
       placeholder='Назва вправи'
       value={title}
       onChange={(e) => setTitle(e.target.value)}
       />

      <input
       type="number"
       placeholder='Вага'
       value={weight}
       onChange={(e) => setWeight(e.target.value)}
       />

      <input
       type="number"
       placeholder='К-ть повторів'
       value={reps}
       onChange={(e) => setReps(e.target.value)}
       />

       <button onClick={addWorkout} >додати</button>

       <ul>
       {list.map((item) => (
       
          <li key={item.id}> 
          {item.title}: {item.weight} кг {item.reps} повт.
          <button onClick={() => removeWorkout(item.id)}>DELATE</button>
          </li>
        ))} 
        </ul>
      
    </div>
   ); 
  
}


export default App;
