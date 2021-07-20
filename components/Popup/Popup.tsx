import React, {Fragment} from 'react'
import _ from 'lodash';
import useOnClickOutside from 'use-onclickoutside'
import { Dialog, Transition } from '@headlessui/react'

const Popup = ({children, size, visible, setVisible}) => {
  const ref = React.useRef(null)

  const close = () => {
    if(visible){
      setVisible(!visible)
    }
  }
  useOnClickOutside(ref, close)

  return (
    <Transition
        show={visible}
        appear 
        as={Fragment}
      >
      <Dialog as="div" 
        onClose={()=>setVisible(false)} 
        className="fixed z-10 inset-0 overflow-y-auto">
        <div className="min-h-screen px-4 text-center">
          
          {/* Background overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-50"
            leave="ease-in duration-200"
            leaveFrom="opacity-50"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-75" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          {/* Children */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div ref={ref} className={'inline-block w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl ' + (!_.isEmpty(size) ? size : 'max-w-lg')}>
              {children}
            </div>
          </Transition.Child>
      
        </div>
      </Dialog>
    </Transition>
  )
}


export default Popup
