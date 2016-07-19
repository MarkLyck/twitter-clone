import Session from './models/session'

let store = {
  settings: {
    appKey: 'kid_By1OAAow',
    appSecret: '0181b8fc5d3e46f49b1c888b2062d3e6',
    basicAuth: btoa('kid_By1OAAow:0181b8fc5d3e46f49b1c888b2062d3e6'),
  },
  session: new Session()
}

export default store
