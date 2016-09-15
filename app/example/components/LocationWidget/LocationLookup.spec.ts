import { callAPI } from './LocationLookup'
import { actions } from '../../reducers/main'
import axios from 'axios'
import * as sinon from 'sinon'
import { expect } from 'chai';

const mockUrl = new RegExp('https://maps.googleapis.com/maps/api/geocode/json*')
const returnedAddress = '123 Main street'
const okResponse = [
  200,
  { 'Content-type': 'application/json' },
  JSON.stringify({
    results: [
      { formatted_address: returnedAddress }
    ]
  })
];
const errResponse = [
  404,
  { 'Content-type': 'application/json' },
  'ERROR'
];

describe('(Actions) LocationWidget', () => {
  var server

  beforeEach(() => {
    server = sinon.fakeServer.create();
    server.respondImmediately = true
  })

  afterEach(function () {
    server.restore();
  });

  describe('Check Search Location API calls', () => {
    var dispatch

    beforeEach(() => {
      dispatch = sinon.stub()
    })

    it('function callAPI is available', () => {
      expect(callAPI).to.be.a('function')
    })

    it('function callAPI is successful', (done) => {
      server.respondWith('GET', mockUrl, okResponse);
      //dispatch.should.have.not.been.called
      callAPI('filter', dispatch)

      setTimeout(() => {
        //dispatch.should.have.been.calledTwice

        expect(dispatch.firstCall.args[0]).to.deep.equal(actions.fetchLocationStart());
        expect(dispatch.secondCall.args[0]).to.deep.equal(actions.fetchLocationSuccess([{ formatted_address: returnedAddress }]));
        // sinon-chai is not compatible yet with sinon v2.0.0, once supportred a better 
        // assertion can be used -->
        // dispatch.getCall(0).should.have.been.calledWith({ type: "FETCH_LOCATIONS_START" });
        // dispatch.getCall(1).should.have.been.calledWith({ payload: [{ formatted_address: "5 Margalit street Haifa Israel" }], type: "FETCH_LOCATIONS_SUCCESS" });
        done()
      }, 500)
    })

    it('function callAPI failure', (done) => {
      server.respondWith('GET', mockUrl, errResponse);
      callAPI('filter', dispatch)

      setTimeout(() => {
        expect(dispatch.firstCall.args[0]).to.deep.equal(actions.fetchLocationStart());
        expect(dispatch.secondCall.args[0].type).to.be.equal(actions.fetchLocationFailure('').type);
        done()
      }, 500)
    })
  })
})
