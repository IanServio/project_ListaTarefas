import { Link } from 'react-router-dom'

import {useState} from 'react'
import './home.css'

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'


import { useNavigate } from 'react-router-dom'

export default function Home(){

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

 async function handleLogin(e){
  e.preventDefault();

  if(email != '' && password != ''){
    await signInWithEmailAndPassword(auth, email, password)
    .then(()=>{
      navigate('/admin', { replace: true })
    })
    .catch((error)=>{
      console.log('error ao fazer login' + error)
    })
  }else{
    alert('preencha todos os campos')
  }
  
}


  return(
    <div className='home-container'>
      <h1>Lista de tarefas</h1>
      <span>Gerencie a agenda de forma bacana</span>
      <h1>Login</h1>
      <form className='form' onSubmit={handleLogin}>
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
        <button type="submit"> Acessar </button>

      </form>

      <Link  className='button-link' to='/register' >
      Nao possui uma conta? Cadastre-se
      </Link>
    </div>
  )
}