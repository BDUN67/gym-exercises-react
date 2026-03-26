import { useState, useEffect } from 'react'
import './App.css'

function App() {
 
  const [activeDay, setActiveDay] = useState('Пн'); //Пн ставимо за замовчуванням як перший вибраний день 
  const [title, setTitle] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  const [workouts, setWorkouts] = useState(() => {
    //намагаємось отримати данні за ключем
    const saved = localStorage.getItem('power-log-v2');
    // Якщо дані є, перетворюємо рядок на об'єкт, інакше повертаємо початкову структуру
    return saved ? JSON.parse(saved) : {      //JSON.parse метод для читання браузером
      Пн: [],
      Вт: [],
      Ср: [],
      Чт: [],
      Пт: [],
      Сб: [],
      Нд: [],
      Заг: []
    };
  });



  

 useEffect(() =>{
    localStorage.setItem('power-log-v2', JSON.stringify(workouts)); //JSON.stringify метод для запису
  }, [workouts]); // хук(useEffect) спрацьовує при кожній зміні об'єкта data


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
  setWorkouts((prevWorkouts) =>({
    ...prevWorkouts, //копіюємо всі дні (Пн, Вт, ...)
    [activeDay]: [...prevWorkouts[activeDay], newWorkout] // оновлення обранного дня
  }));

  // 4. "Скидаємо" форму (очищаємо інпути)
  setTitle('');
  setWeight('');
  setReps('');
  }


  const removeWorkout = (id) =>{
    setWorkouts((prevWorkouts) => ({
    ...prevWorkouts,
    [activeDay]: prevWorkouts[activeDay].filter(item => item.id !== id)
  }));  
  }

  

   




   return(

    <div className='app-container'>
      <h1>PowerLog: мій прогрес</h1>
      
      <div className="days-nav">
          {['Пн','Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд', 'Заг' ].map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              style={{ 
               backgroundColor: activeDay === day ? 'orange' : 'lightgray',
               margin: '5px',
               fontWeight: activeDay === day ? 'bold' : 'normal'
      }}>
      {day}
            </button>
          ))  }
      </div>

      
     <div className='workout-form'>

     
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

       <button className='add-btn' onClick={addWorkout} >додати</button>
      </div>

       <ul>
       {workouts[activeDay].map((item) => (
       
          <li key={item.id} className='workout-item'> 
          <div className='workout-info'>
          <span className='workout-title'>{item.title}: </span>
          <span className='workout-details'>{item.weight} кг {item.reps} повт.</span>
          </div>

          <button className="delete-btn" onClick={() => removeWorkout(item.id)}>DELATE</button>
          </li>
        ))} 
        </ul>
      
    </div>
   ); 
  
}



export default App;
