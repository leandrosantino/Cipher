import { ArrowUpDown } from 'lucide-react'
import { useEffect, useState } from 'react';
import { crypter } from './crypter';

function App() {

  const [isCrypt, setIsCrypt] = useState(true)
  const [text, setText] = useState('')
  const [key, setKey] = useState('')
  const [cipher, setCipher] = useState('')


  useEffect(() => {
    if (text !== '' && key !== '') {
      setCipher(crypter({
        key, text,
        type: isCrypt ? 'encrypt' : 'decrypt'
      }))
    }
  }, [text, key, isCrypt])

  useEffect(() => {
    const oldText = text.toString()
    const oldCipher = cipher.toString()
    setCipher(oldText)
    setText(oldCipher)
  }, [isCrypt])


  return (
    <div className="p-2 selection:w-full h-screen flex justify-center items-center bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
      <div className="bg-white shadow-xl w-full h-full max-w-[400px] max-h-[500px] rounded-xl p-4 flex justify-start items-center flex-col" >

        <h1 className="text-gray-900 font-semibold text-3xl" >
          CIPHER
        </h1>

        <main className="w-full h-full p-2 mt-2">

          <label htmlFor="text1" className="text-gray-900 font-medium">{isCrypt ? 'Mensagem:' : 'Código:'}</label>
          <textarea
            id="text1"
            className="w-full h-28 border-gray-900 border rounded-md resize-none p-2 selection:bg-gray-200"
            placeholder={isCrypt ? 'Menssagem original' : 'Menssagem criptografada:'}
            value={text}
            onChange={e => setText(e.target.value)}
          ></textarea>

          <div className="w-full flex mt-4 mb-2" >

            <div className="flex flex-1 justify-center items-center" >
              <button
                className='text-gray-900 p-2 rounded-full hover:cursor-pointer hover:bg-gray-200'
                onClick={() => setIsCrypt(old => !old)}
              >
                <ArrowUpDown strokeWidth={2} />
              </button>
            </div>
            <div className="flex flex-1 justify-center items-center" >
              <label htmlFor="key" className="text-gray-900 font-medium mr-1">Chave:</label>
              <input
                placeholder='chave de criptografia'
                id="key" type="text"
                className="w-40 border-gray-900 border rounded-md p-1 selection:bg-gray-200"
                value={key}
                onChange={e => setKey(e.target.value)}
              />
            </div>
          </div>

          <label htmlFor="text2" className="text-gray-900 font-medium">{isCrypt ? 'Código:' : 'Mensagem:'}</label>
          <textarea
            readOnly
            id="text2"
            className="w-full h-28 border-gray-900 border rounded-md resize-none p-2"
            placeholder={isCrypt ? 'Informação encriptografada' : 'Menssagem descriptografada:'}
            value={cipher}
          ></textarea>

        </main>


        <footer className="w-full text-center text-sm italic" >
          &copy;leadnroSantino
        </footer>

      </div>
    </div>
  );
}

export default App;
