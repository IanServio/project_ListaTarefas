import { Link } from 'react-router-dom'
import {useState} from 'react'

import { auth } from '../../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


export default function Register(){

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

async function handleRegister(e){
  e.preventDefault();

  if(email != '' && password != ''){
    await createUserWithEmailAndPassword(auth, email, password)
    .then(()=>{
      navigate('/admin', { replace: true })
    })
    .catch(()=>{
      console.log('Error ao fazer o cadastro')
    })

  }else{
    alert('preencha todos os campos')
  }
  
}


  return(
    <div className='home-container'>
      <h1>Cadastre-se</h1>
      <span>Vamos criar sua conta</span>

      <form className='form' onSubmit={handleRegister}>
        <input 
        type='text' 
        placeholder='Digite seu E-mail:'  
        value={email} 
        onChange={(e)=> setEmail(e.target.value)}
        />

        <input 
        type='password' 
        placeholder='Digite sua Senha:'  
        value={password} 
        onChange={(e)=> setPassword(e.target.value)}
        />
        <button type="submit"> Cadastrar </button>

      </form>

      <Link  className='button-link' to='/' >
      Ja possui uma conta? Faca o Login
      </Link>
    </div>
  )
}