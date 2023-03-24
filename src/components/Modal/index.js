import React from 'react'

const Modal = ({onClose, title, children, closeIcon, classContent}) => {
  return (
    <div id="myModal" className="modal">
      <div className={`modal-content ${classContent}`}>
        <button
          className={`flex ${title ? "justify-between" : "justify-end"} w-full`}
          onClick={() => onClose()}
        >
          {title && <div className='text-2xl text-gray-700'>{title}</div>}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="#000"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M6 6L18 18"
              stroke="#000"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
        <div className="text-black">{children}</div>
      </div>
    </div>
  );
}

export default Modal