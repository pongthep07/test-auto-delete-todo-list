import React, { useState, useEffect } from 'react';
import './App.css';

interface TodoItem {
  type: string;
  name: string;
}


const App = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([
    { type: 'Fruit', name: 'Apple' },
    { type: 'Vegetable', name: 'Broccoli' },
    { type: 'Vegetable', name: 'Mushroom' },
    { type: 'Fruit', name: 'Banana' },
    { type: 'Vegetable', name: 'Tomato' },
    { type: 'Fruit', name: 'Orange' },
    { type: 'Fruit', name: 'Mango' },
    { type: 'Fruit', name: 'Pineapple' },
    { type: 'Vegetable', name: 'Cucumber' },
    { type: 'Fruit', name: 'Watermelon' },
    { type: 'Vegetable', name: 'Carrot' },
  ]);

  const [todoListSelect, setTodoListSelect] = useState<TodoItem[]>([]);

  const moveItemToColumn = (item: TodoItem) => {

    setTodoListSelect(prevState => [...prevState, item])
    setTodoList(prevState => prevState.filter(todo => todo !== item));
  };

  const moveItemBackToTodoList = (item: TodoItem) => {
    setTodoList(prevState => [...prevState, item]);
    setTodoListSelect(prevState => prevState.filter(todo => todo !== item));
  };

  const moveItemBackToTodoListIndex = () => {
    const itemFirstIndex = todoListSelect[0];
    if (todoListSelect[0]) {
      setTodoList(prevState => [...prevState, itemFirstIndex]);
      setTodoListSelect(prevState => prevState.filter(todo => todo !== itemFirstIndex));
    }


  }

  useEffect(() => {
    const timer = setTimeout(() => {
      todoListSelect.forEach(item => {
        moveItemBackToTodoList(item);
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [todoListSelect]);

  return (
    <div className="App">
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className='h-full'>
          <div>
            {todoList.map((item, index) => (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-80 my-3" key={index} onClick={() => moveItemToColumn(item)}>{item.name}</button>
            ))}
          </div>
        </div>
        <div className='border h-full' onClick={() => moveItemBackToTodoListIndex()}>
          <div className="column">
            <h2 className='w-full bg-gray-100 py-2'>Fruit</h2>
            {todoListSelect.map((item, index) => (
              item.type === 'Fruit' ? (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-80 my-3" key={index} onClick={() => moveItemBackToTodoList(item)}>{item.name}</button>
              ) : null
            ))}
          </div>
        </div>
        <div className='border h-full'  onClick={() => moveItemBackToTodoListIndex()}>
          <div className="column">
            <h2 className='w-full bg-gray-100 py-2'>Vegetable</h2>
            {todoListSelect.map((item, index) => (
              item.type !== 'Fruit' ? (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-80 my-3" key={index} onClick={() => moveItemBackToTodoList(item)}>{item.name} </button>
              ) : null
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
