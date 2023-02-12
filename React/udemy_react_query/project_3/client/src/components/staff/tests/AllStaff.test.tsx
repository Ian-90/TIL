import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { QueryClientProvider, setLogger } from 'react-query';

import { server } from '../../../mocks/server';
import { generateQueryClient } from '../../../react-query/queryClient';
import { renderWithQueryClient } from '../../../test-utils';
import { AllStaff } from '../AllStaff';

test('renders response from query', async () => {
  // write test here
  renderWithQueryClient(<AllStaff />);
  const staffNames = await screen.findAllByRole('heading', {
    name: /divya|sandra|michael|mateo/i,
  });

  expect(staffNames).toHaveLength(4);
});

test('handles query error', async () => {
  // (re)set handler to return a 500 error for staff
  server.resetHandlers(
    rest.get('http://localhost:3030/staff', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );
  // 아무 파일이 없다는 가정하에 짜는 테스트 코드
  setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {
      //
    },
  });

  const queryClient = generateQueryClient();
  const options = queryClient.getDefaultOptions();
  options.queries = {
    ...options.queries,
    retry: false,
  };
  queryClient.setDefaultOptions(options);

  render(
    <QueryClientProvider client={queryClient}>
      <AllStaff />
    </QueryClientProvider>,
  );

  const alertToast = await screen.findByRole('alert');
  expect(alertToast).toHaveTextContent('Request failed with status code 500');
});
