import {useState, useCallback, useEffect, useRef} from 'react';

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberallowed] = useState(false)
  const [charAllowed, setCharallowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
   let pass = "";
   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuviwxyz";
   if (numberAllowed) str += "0123456789";
   if(charAllowed) str += "@#$%^&*(){}[]";

   for(let i = 1; i<=length; i++){
      let char = Math.random() * str.length + 1  
      pass += str.charAt(char)
   }

   setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 999)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
     passwordGenerator()
  }, [length, charAllowed, numberAllowed, setPassword, passwordGenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" className="outline-none w-full py-1 px-3" placeholder="Password" readOnly value={password} ref={passwordRef}/>
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPassword}>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={8} max={100} className='cursor-pointer' value={length} onChange={(e)=>setLength(e.target.value)}/>
          <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" id="numberInput" defaultChecked={numberAllowed} onChange={()=>setNumberallowed(prev => !prev)}/>
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" id="characterInput" defaultChecked={charAllowed} onChange={()=>setCharallowed(prev => !prev)}/>
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
