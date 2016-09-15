import * as f from './main'

describe('(Reducers) LocationWidget', () => {

  describe('Check initial sate', () => {

    beforeEach(() => {
      
    })

    it('Initial state should contain ...', () => {
      expect(f.initialState).not.to.be.null
      expect(f.initialState).not.to.be.undefined
      expect(f.initialState.fetching).to.equal(false)
      expect(f.initialState.fetched).to.equal(false)
      expect(f.initialState.err).to.be.null
      expect(f.initialState.locations).to.be.an('array')
      expect(f.initialState.locations).to.have.length(0);
    })
  })

  describe('(Reducer) locationsReducer', () => {
    it('action type - FETCH_LOCATIONS_START', () => {
      let action = { type: 'FETCH_LOCATIONS_START' }
      let newState = f.locationReducer(f.initialState, action)
      expect(newState).not.to.be.null
      expect(newState.fetching).to.equal(true)
    })
  
    it('action type - FETCH_LOCATIONS_SUCCESS', () => {
      let action = {
        type: 'FETCH_LOCATIONS_SUCCESS',
        locations: [1,2]
      }
      let newState = f.locationReducer(f.initialState, action)
      expect(newState).not.to.be.null
      expect(newState.fetching).to.equal(false)
      expect(newState.fetched).to.equal(true)
      expect(newState.locations).to.have.length(2)
    })

    it('action type - FETCH_LOCATIONS_FAILURE', () => {
      let action = {
        type: 'FETCH_LOCATIONS_FAILURE',
        err: 'Error'
      }
      let newState = f.locationReducer(f.initialState, action)
      expect(newState).not.to.be.null
      expect(newState.fetching).to.equal(false)
      expect(newState.fetched).to.equal(false)
      expect(newState.err).to.equal('Error')
    })
  })
})
