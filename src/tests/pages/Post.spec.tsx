import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';

import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

type Post = {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
};

jest.mock('next-auth/client');
jest.mock('../../services/prismic');

const post: Post = {
  slug: 'post-1',
  title: 'Post 1',
  content: '<p>Post content</p>',
  updatedAt: 'June 19',
};

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />);

    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText('Post content')).toBeInTheDocument();
    expect(screen.getByText('June 19')).toBeInTheDocument();
  });

  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    });

    const response = await getServerSideProps({
      params: { slug: 'post-1' },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        }),
      })
    );
  });

  it('loads post data if found a user subscription', async () => {
    const getSessionMocked = mocked(getSession);
    const getPrismicClientMocked = mocked(getPrismicClient);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    });

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        slug: 'post-1',
        data: {
          title: [{ text: 'Post 1', type: 'heading' }],
          content: [{ text: 'Post content', type: 'paragraph' }],
        },
        last_publication_date: '06-19-2020',
      }),
    } as any);

    const response = await getServerSideProps({
      params: { slug: 'post-1' },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'post-1',
            title: 'Post 1',
            content: '<p>Post content</p>',
            updatedAt: '19 de junho de 2020',
          },
        },
      })
    );
  });
});
