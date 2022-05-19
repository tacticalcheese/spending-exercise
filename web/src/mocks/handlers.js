import { rest } from 'msw';
import spendingListMock from './mockData';

const fakeServerResponse = spendingListMock;

export const handlers = [
  rest.get('http://localhost/spendings/', (req, res, ctx) => {
    req.url.searchParams.getAll('orderBy');
    return res(
      ctx.status(200),
      ctx.json(fakeServerResponse)
    )
  }),

  rest.post('http://localhost/spendings/', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json(fakeServerResponse[0])
    )
  })
];