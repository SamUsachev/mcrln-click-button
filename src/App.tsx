import { useState } from 'react'
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';
import { Error as Alert } from './components';

import './App.css'

const App = () => {
  const [count, setCount] = useState(0);
  const [serverCount, setServerCount] = useState(0);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const url = 'https://lk.zont-online.ru/api';

  const onCounter = () => {
    setCount(prev => prev + 1);
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    const timeoutIdCurrent = setTimeout(() => fetchButtonCount(count + 1), 1000);
    setTimeoutId(timeoutIdCurrent);
  }

  const fetchButtonCount = async (count: number) => {
    try {
      setLoading(true);
      const res = await axios(`${url}/button_count`, {
        method: 'POST',
        headers: { 'X-ZONT-Client': 'semenusachev10@gmail.com' },
        data: { count },
      });
      const resServerCount = res.data?.count;
      setServerCount(resServerCount);
    }
    catch (err: any) {
      setErr(err?.message)
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      {err && (<Alert variant="outlined" severity="error" alertText={err}> </Alert>)}
      <button disabled={loading} onClick={onCounter}>кликнуть</button>
      <span>Кликнули {count} раз</span>
      {loading && <CircularProgress />}<span>По версии сервера: {serverCount} раз</span>
    </div>
  )
}

export default App
