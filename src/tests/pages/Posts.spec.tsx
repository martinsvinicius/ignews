import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import Posts, { getStaticProps } from '../../pages/posts';
import { getPrismicClient } from '../../services/prismic';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

jest.mock('../../services/stripe');
jest.mock('../../services/prismic');

const posts: Post[] = [
  {
    slug: 'post-1',
    title: 'Post 1',
    excerpt: 'Post 1 excerpt',
    updatedAt: 'June 19',
  },
];

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 1 excerpt')).toBeInTheDocument();
    expect(screen.getByText('June 19')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'post-1',
            data: {
              title: [{ type: 'heading1', text: 'Post 1' }],
              content: [{ type: 'paragraph', text: 'Post 1 excerpt' }],
            },
            last_publication_date: '04-12-2021',
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'post-1',
              title: 'Post 1',
              excerpt: 'Post 1 excerpt',
              updatedAt: '12 de abril de 2021',
            },
          ],
        },
      })
    );
  });
});
