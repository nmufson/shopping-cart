import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carousel from './Carousel';
import styles from './Carousel.module.css';

const isSlideActive = (element: HTMLElement) => {
  return element.className.includes('active');
};

describe('Carousel', () => {
  // beforeEach(() => {
  //   vi.useFakeTimers();
  // });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders first image initially', () => {
    render(<Carousel />);

    const firstImage = screen.getByAltText(
      'Slide 1: Group of people gathered wearing street wear'
    );
    expect(isSlideActive(firstImage.parentElement!)).toBe(true);
  });

  it('navigates to next slide when next button is clicked', async () => {
    const { container } = render(<Carousel />);

    // could not select the button by aria label
    const nextButton = container.getElementsByClassName(styles.next)[0];
    expect(nextButton).toBeInTheDocument();

    await userEvent.click(nextButton);

    const secondImage = screen.getByAltText(
      'Slide 2: Man walking while wearing jean jacket and sunglasses'
    );
    expect(isSlideActive(secondImage.parentElement!)).toBe(true);
  });

  it('navigates to previous slide when previous button is clicked', async () => {
    render(<Carousel />);

    // First go to second slide
    const nextButton = screen.getByLabelText('Next slide');
    await userEvent.click(nextButton);

    // Then go back to first slide
    const prevButton = screen.getByLabelText('Previous slide');
    await userEvent.click(prevButton);

    const firstImage = screen.getByAltText(
      'Slide 1: Group of people gathered wearing street wear'
    );
    expect(isSlideActive(firstImage.parentElement!)).toBe(true);
  });

  it('wraps to first slide when clicking next on last slide', async () => {
    render(<Carousel />);

    const nextButton = screen.getByLabelText('Next slide');
    // Click next 4 times to get to last slide
    for (let i = 0; i < 4; i++) {
      await userEvent.click(nextButton);
    }

    // Click next one more time
    await userEvent.click(nextButton);

    const firstImage = screen.getByAltText(
      'Slide 1: Group of people gathered wearing street wear'
    );
    expect(isSlideActive(firstImage.parentElement!)).toBe(true);
  });

  it('wraps to last slide when clicking previous on first slide', async () => {
    render(<Carousel />);

    const prevButton = screen.getByLabelText('Previous slide');
    await userEvent.click(prevButton);

    const lastImage = screen.getByAltText(
      'Slide 5: Two women wearing fashion outfits'
    );
    expect(isSlideActive(lastImage.parentElement!)).toBe(true);
  });

  it('navigates to specific slide when indicator bar is clicked', async () => {
    render(<Carousel />);

    const thirdSlideButton = screen.getByLabelText('Go to slide 3');
    await userEvent.click(thirdSlideButton);

    const thirdImage = screen.getByAltText(
      'Slide 3: Skateboarder with beanie and green jacket'
    );
    expect(isSlideActive(thirdImage.parentElement!)).toBe(true);
  });

  describe('Timer-based tests', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.restoreAllMocks();
      vi.useRealTimers();
    });

    it('auto-advances to next slide after 5 seconds', () => {
      render(<Carousel />);

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      const secondImage = screen.getByAltText(
        'Slide 2: Man walking while wearing jean jacket and sunglasses'
      );
      expect(isSlideActive(secondImage.parentElement!)).toBe(true);
    });

    it('clears interval on unmount', () => {
      const { unmount } = render(<Carousel />);
      const clearIntervalSpy = vi.spyOn(window, 'clearInterval');

      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();
    });
  });
});
