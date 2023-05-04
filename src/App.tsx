
import { useState } from 'react'
import axios from 'axios';
import './App.css'

interface IApp {
  count: number,
  loading: boolean,
  err: string,
  disabled: boolean,
}

const App: React.FC<IApp> = ({ }) => {
  const [count, setCount] = useState(0);
  const [serverCount, setServerCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const url = 'https://lk.zont-online.ru/api';


  const countHandler = async () => {
    // const timer = null
    const newCount = serverCount + 1
    setServerCount((serverCount) => serverCount + 1)
    setLoading(true);
    try {
      setCount((count) => count + 1);
      const res = await axios(`${url}/button_count`, {
        method: 'POST',
        headers: { 'X-ZONT-Client': 'semenusachev10@gmail.com' },
        data: { count: newCount },
      });
      console.log(res);

    } catch (err: any) {
      console.log(err)

      setErr(err)
    }
    finally {
      setLoading(false);
    }

  }

  return (
    <div className="container">
      {err && <h2>{err}</h2>}
      <button disabled={loading} onClick={countHandler}>кликнуть</button>
      <span>Кликнули {count} раз</span>
      {loading && <h2>Loading...</h2>}<span>По версии сервера: {serverCount} раз</span>
    </div>
  )
}

export default App
