import React ,{ useState } from 'react';
import api from '../../services/api';

export default function Login({history}) {
    const [email, setEmail] = useState(''); // setEmail atualizara o estado da variavel email

    async function HandleSubmit(event){
      event.preventDefault();
 
      const response = await api.post('/sessions', { email });
  
      const { _id } = response.data;
  
      localStorage.setItem('user', _id);

      history.push('/dashboard');
    }

    return (
    <>    
        <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>
      
        <form onSubmit={HandleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
            <input
                type="email"
                id="email"
                placeholder="só vai"
                value={email}
                onChange={event => setEmail(event.target.value)} /*função arrow function*/
            />
            <button type="submit" className="btn" >Entrar</button>
        </form>
    </>
    );
}