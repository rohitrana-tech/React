import { useState , useCallback , useEffect , useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [characterAllow, setCharacterAllow] = useState(false)
  const [password, setPassword] = useState('')

  // useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerate = useCallback(()  => { 
    let pass = " "
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(numberAllow){
      str += "0123456789"
    }

    if(characterAllow){
      str += "!@#$%^&*()_+"
    }

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)

    } ,[length, numberAllow, characterAllow, setPassword])

    const copyPasswordToClipboard = useCallback(() => {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 25); // For mobile devices
      window.navigator.clipboard.writeText(password)
    },[password])
      
    

    useEffect(() => {
      passwordGenerate()
    }, [length, numberAllow, characterAllow, passwordGenerate])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
       <h1 className='text-white text-center my-3'>Password Generator</h1>
       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full px-3 py-1  bg-white text-black'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 
             cursor-pointer hover:bg-sky-600 transition-colors duration-200'>
          Copy</button>

       </div>
        <div className='flex text-sm gap-x-2'>
           <div className='flex items-center gap-x-1'>
            <input
            type="range"
            min={6}
            max={25}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
             />
            <label>Length: {length}</label>
           </div>
           <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllow}
          id="numberInput"
          onChange={() => {
              setNumberAllow((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={characterAllow}
              id="characterInput"
              onChange={() => {
                  setCharacterAllow((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
        </div>
     </div>
    </>
  )
}

export default App
