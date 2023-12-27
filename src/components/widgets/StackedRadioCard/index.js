import React from 'react'

const StackedRadioCard = ({cards, selectedCard, handleSelectedCardChange}) => {

  return (
    <fieldset>
    <div className="space-4 gap-4 mt-5 sm:flex">
      {cards.map((card, index) => (
        <label
          key={index}
          className={`relative list-none mt-3 sm:mt-0 cursor-pointer rounded-lg sm:flex-grow text-center justify-center items-center align-middle flex border bg-white px-6 py-4 shadow-sm focus:outline-none ${
            selectedCard === card.name ? 'border-primaryColor ring-2 ring-primaryColor' : 'border-gray-300'
          }`}
        >
          <input
            type="radio"
            name="server-size"
            value={card.name}
            className="sr-only"
            checked={selectedCard === card.name}
            onChange={() => handleSelectedCardChange(card.name)}
            aria-labelledby={`server-size-${card.name}-label`}
            aria-describedby={`server-size-${card.name}-description-0 server-size-${card.name}-description-1`}
          />
          <div className="flex flex-col items-center"> {/* Center the image vertically and horizontally */}
            {card.card}
          </div>
        </label>
      ))}
    </div>
  </fieldset>
  
  )
}

export default StackedRadioCard
