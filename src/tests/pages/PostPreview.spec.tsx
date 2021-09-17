import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { mocked } from 'ts-jest/utils';

import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { getPrismicClient } from '../../services/prismic';

interface PostPreview {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}

jest.mock('next-auth/client');
jest.mock('../../services/prismic');
jest.mock('next/router');

const post: PostPreview = {
  slug: 'test-slug',
  title: 'Test Title',
  content: '<p>Test Content</p>',
  updatedAt: 'June 19',
};

describe('PostPreview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<PostPreview post={post} />);

    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
  });

  it('redirects user to full post when user is subscribed', () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);

    const pushMocked = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription' },
      true,
    ] as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked,
    } as any);

    render(<PostPreview post={post} />);

    expect(pushMocked).toHaveBeenCalledWith(`/posts/${post.slug}`);
  });

  it('loads initial post data preview correctly', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    const postContent = 'Post Content'.slice(0, 3);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        slug: post.slug,
        data: {
          title: [{ text: 'Post 1', type: 'heading' }],
          content: [{ text: 'Post Content', type: 'paragraph' }],
        },
        last_publication_date: '06-19-2020',
      }),
    } as any);

    const response = await getStaticProps({
      params: { slug: post.slug },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: post.slug,
            title: 'Post 1',
            content: '<p>Post Content</p>',
            updatedAt: '19 de junho de 2020',
          },
        },
      })
    );
  });
});
