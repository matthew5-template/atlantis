// import AxiosMockAdapter from 'axios-mock-adapter'
// import request from '@/request'
// import { requestContactsUrl } from '@/request/apis'
// import { getContactsByPhoneNumber } from './contacts'
// import { ACTIONS } from '@/redux/actionTypes'

// describe('test contacts action creators', () => {
//   test('creator getContactsByPhoneNumber()', async () => {
//     const mockRequest = new AxiosMockAdapter(request)
//     const phoneNumber = '123456'
//     mockRequest
//       .onPost(requestContactsUrl)
//       .reply(200, { contacts: [{ name: 'c1', phone: 1 }] })

//     const dispatch = jest.fn()
//     await getContactsByPhoneNumber(phoneNumber)(dispatch)
//     expect(dispatch).toBeCalledWith({
//       type: ACTIONS.UPDATE_CONTACTS,
//       payload: {
//         phoneNumber,
//         items: { contacts: [{ name: 'c1', phone: 1 }] },
//       },
//     })

//     mockRequest.restore()
//   })
// })
