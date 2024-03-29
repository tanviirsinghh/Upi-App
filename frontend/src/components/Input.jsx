import React from 'react'

function Input({label}, {onChange},placeholder) {
  return (
    <>    <div className='text-sm font-medium text-left py-2'>
      {label}
    </div>
    <input onChange={onChange} className='w-full px-2 py-1 border rounded border-slate-200' type="text"  placeholder={placeholder}/>
    </>

  )
}

export default Input
