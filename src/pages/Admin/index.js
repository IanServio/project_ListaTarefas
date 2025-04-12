import { useState, useEffect, use } from 'react'
import './admin.css'
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import { 
  addDoc,
  collection,
  onSnapshot,
  query, 
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc
 } from 'firebase/firestore'

 

export default function Admin() {
 
  const [tarefas, setTarefas] = useState([]);

  useEffect(()=>{
    async function loadTarefas() {
      const useDetail = localStorage.getItem("@detailUser")
      setUser(JSON.parse(useDetail))

      if(useDetail){
        const data = JSON.parse(useDetail);

        const tarefaRef = collection(db, "tarefas")
        const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
        const unsub = onSnapshot(q, (snapshot)=>{
          let lista = [];
          snapshot.forEach((doc)=>{
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid
            })
          })
          
          setTarefas(lista);
        })
      }

    }

    
    loadTarefas();
  },[])


  const [tarefaInput, setTarefaInput] = useState('');
  const [user, setUser] = useState({}) 
  const [edit, setEdit] = useState({})

  async function handleRegister(e){
    e.preventDefault();
    if(tarefaInput == ''){
      alert('Digite sua tarefa!')
    }

    if(edit?.id){
      handleUpdateTarefa();
      return;
    }

    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })
    .then(()=>{
      console.log('Tarefa registrada')
      setTarefaInput('')
    })
    .catch((error)=>{
      console.log('Error ao cadastrar' + error)
    })


  }

  

  async function handleLogout() {
    await signOut(auth);
  }

  async function deleteTarefa(id) {
    const docRef = doc(db, "tarefas", id)

    await deleteDoc(docRef)
  }

  async function editTarefa(item) {
    setTarefaInput(item.tarefa);
    setEdit(item);

  }

  async function handleUpdateTarefa(){
    const docRef = doc(db, "tarefas", edit?.id)
    await updateDoc(docRef,{
      tarefa: tarefaInput
    })
    .then(()=>{
      console.log('tarefa atualizada')
      setTarefaInput('')
      setEdit({})
    })
    .catch(()=>{
      console.log('Error ao atualizar tarefa')
      setTarefaInput('')
      setEdit({})
    })
  }
 return (
   <div className="admin-container">
        <h1>Minhas Tarefas</h1>
        <form  className="form" onSubmit={handleRegister}>
          <textarea
          placeholder="Digite sua tarefa:"
          value={tarefaInput}
          onChange={(e)=>setTarefaInput(e.target.value)}
          />
          {Object.keys(edit).length > 0 ? (
            <button type='submit' className='btn-register' style={{ backgroundColor: '#ffa500'}}>Atualizar tarefa</button>
          ) : (
            <button type='submit' className='btn-register'>Registrar Tarefa</button>
          )}
        </form>

        {tarefas.map((item)=> (
          <article key={item.id }className='list'>
            <p>{item.tarefa}</p>
            <div>
              <button className='btn-edit' onClick={()=>{ editTarefa(item) }}>Editar</button>
              <button className='btn-delete' onClick={()=> deleteTarefa(item.id)}>Concluir</button>
            </div>
          </article>
        ))}
        <button className='btn-logout' onClick={handleLogout}>Sair</button>
   </div>
 );
}