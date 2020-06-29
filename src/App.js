import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function App() {
  const [date, setDate] = useState('')
  const handleChange = (e) => setDate(e.target.value)  

  // const handleInputChange = (event) => console.log(event)  
  
  // useEffect(() => {
  //   console.log('Eu estou montado ou sofri alteração', date)
  // }, [date])  
  const [resp, setMilitar] = useState({ data: [], days: [] });

  useEffect(() => {
    const fetchData = async () => {
      const respGlobal = await axios(
        'http://localhost:8000/api/militar/read.php'
      );
      const respRepos = await axios(
        `http://localhost:8000/api/arranchamento/read_data.php?data=${date}`
      );      
      setMilitar({ data: respGlobal.data.data, days: respRepos.data.data });
    };    
    fetchData();
  }, [date]);  

  // if (resp.data) {
  //   console.log('militar',resp.data,'days', resp.days)
  // }

  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);  
  
  return (
    <div className="App">
      <pre>{JSON.stringify(resp.days)}</pre>
      <form className="container mt-5">
        <input
          type="date"
          onChange={handleChange}
          value={date}
          className="form-control col-md-4 form-control-lg"
        />
        <hr />
          {/* {resp.days
          ? resp.days.date.toLocaleDateString("fr-CA")
          : "No selected date"} */}
      </form>
      {resp.days || resp.days === undefined ?
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
        <ul className="list-group">
          {
            resp.data.map((item, index) => {
              const selected = resp.days && resp.days.find(p => p.cpf === item.cpf);
              const checkCafe = selected && selected.cafe === 'S';
              const checkAlmoco = selected && selected.almoco === 'S';
              const checkJantar = selected && selected.jantar === 'S';
              console.log(checkCafe, item.nomeguerra)
              return (
                <li className="list-group-item bg-secondary text-white" key={index}>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="col">{item.nomeguerra}</h5>
                    <div className="col custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id={'data['+index+'].cafe'} ref={register}  name={'data['+index+'].cafe'} value={checkCafe?1:0} checked={checkCafe}/>
                      <label className="custom-control-label" htmlFor={'data['+index+'].cafe'} ref={register}  name={'data['+index+'].cafe'}>Café</label>
                    </div>
                    <div className="col custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id={'data['+index+'].almoco'} ref={register}  name={'data['+index+'].almoco'} defaultChecked={checkAlmoco} />
                      <label className="custom-control-label" htmlFor={'data['+index+'].almoco'} ref={register}  name={'data['+index+'].almoco'}>Almoço</label>
                    </div>
                    <div className="col custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id={'data['+index+'].jantar'} ref={register}  name={'data['+index+'].jantar'} defaultChecked={checkJantar} />
                      <label className="custom-control-label" htmlFor={'data['+index+'].jantar'} ref={register}  name={'data['+index+'].jantar'}>Jantar</label>
                    </div>
                  </div>
                </li>
              )
            }
          )}
        </ul>
        <button type="submit" className="btn btn-success">Salvar</button>
      </form>
      : ''
      }
    </div>
  );
}

export default App;
