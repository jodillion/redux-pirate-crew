const { createStore } = Redux;

// Your initial state, reducer, constants, action creators, and JS code should go here!

const initialState = {
  currentCrew: [],
  walkedCrew: []
}

const crewReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PIRATE:
      if (action.newPirate != "") {
        const updatedCurrentCrew = state.currentCrew.concat(action.newPirate)
        return Object.assign({}, state, {
          currentCrew: updatedCurrentCrew
        })
      }
      return Object.assign({}, state, {
        currentCrew: updatedCurrentCrew
      })
    case DELETE_PIRATE:
      let updatedWalkedCrew = []
      if (state.currentCrew.length != 0) {
        updatedWalkedCrew = state.walkedCrew.concat(
          state.currentCrew.shift())
      } else {
        updatedWalkedCrew = state.walkedCrew
      }
      return Object.assign({}, state, {
        currentCrew: state.currentCrew,
        walkedCrew: updatedWalkedCrew
      })
    default:
      return state;
  }
}

const newPirateForm = document.getElementById('new-pirate-form')

const ADD_PIRATE = 'ADD_PIRATE'

const addPirateToList = newPirate => {
  return {
    type: ADD_PIRATE,
    newPirate: newPirate
  }
}

newPirateForm.addEventListener('submit', () => {
  event.preventDefault();
  const newPirate = document.getElementById('name').value
  document.getElementById('name').value = ''
  store.dispatch(addPirateToList(newPirate))
})

const walkPlankButton = document.getElementById('walk-the-plank')
const DELETE_PIRATE = 'DELETE_PIRATE'

const deletePirateFromCrew = deletedPirate => {
  return {
    type: DELETE_PIRATE,
  }
}

walkPlankButton.addEventListener('click', () => {
  store.dispatch(deletePirateFromCrew())
})

const store = createStore(crewReducer);
const crewMemberSection = document.getElementById('current-crew')
const walkedCrewList = document.getElementById('walked-crew')
const walkedCrewCount = document.getElementById('plank-walkers')

const render = () => {
  let newCurrentCrew = ''
  let newWalkedCrewList = ''
  store.getState().currentCrew.forEach(function(crew) {
    newCurrentCrew += `<li>${crew}</li>`
  })
  crewMemberSection.innerHTML = newCurrentCrew
  store.getState().walkedCrew.forEach(function(crew) {
    newWalkedCrewList += `<li>${crew}</li>`
  })
  walkedCrewList.innerHTML = newWalkedCrewList
  let numWalkedCrew = 0
  if (newWalkedCrewList != '') {
    numWalkedCrew = store.getState().walkedCrew.length
  }
  walkedCrewCount.innerHTML = numWalkedCrew
}

render();
store.subscribe(render);
