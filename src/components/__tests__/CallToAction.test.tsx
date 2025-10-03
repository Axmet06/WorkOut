import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CallToAction from '../CallToAction';

describe('CallToAction Component', () => {
  const mockTestimonials = [
    {
      id: '1',
      name: 'Ахмет Толонов',
      role: 'Developer',
      content: 'Great platform!',
      rating: 5
    },
    {
      id: '2',
      name: 'Аруна Тазабекова',
      role: 'Designer',
      content: 'Very helpful!',
      rating: 4
    }
  ];

  const mockPrimaryAction = {
    label: 'Get Started',
    onClick: jest.fn()
  };

  const mockSecondaryAction = {
    label: 'Learn More',
    onClick: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders title and description correctly', () => {
    render(
      <CallToAction
        title="Join Our Platform"
        description="Find great opportunities"
        primaryAction={mockPrimaryAction}
      />
    );

    expect(screen.getByText('Join Our Platform')).toBeInTheDocument();
    expect(screen.getByText('Find great opportunities')).toBeInTheDocument();
  });

  test('renders testimonials when provided', () => {
    render(
      <CallToAction
        title="Join Our Platform"
        description="Find great opportunities"
        testimonials={mockTestimonials}
        primaryAction={mockPrimaryAction}
      />
    );

    // Testimonials content is wrapped in quotes in the component
    expect(screen.getByText('"Great platform!"')).toBeInTheDocument();
    expect(screen.getByText('"Very helpful!"')).toBeInTheDocument();
    expect(screen.getByText('Ахмет Толонов')).toBeInTheDocument();
    expect(screen.getByText('Аруна Тазабекова')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
  });

  test('renders action buttons correctly', () => {
    render(
      <CallToAction
        title="Join Our Platform"
        description="Find great opportunities"
        primaryAction={mockPrimaryAction}
        secondaryAction={mockSecondaryAction}
      />
    );

    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  test('calls onClick handlers when buttons are clicked', () => {
    render(
      <CallToAction
        title="Join Our Platform"
        description="Find great opportunities"
        primaryAction={mockPrimaryAction}
        secondaryAction={mockSecondaryAction}
      />
    );

    fireEvent.click(screen.getByText('Get Started'));
    expect(mockPrimaryAction.onClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Learn More'));
    expect(mockSecondaryAction.onClick).toHaveBeenCalledTimes(1);
  });

  test('renders correct variant classes', () => {
    const { container } = render(
      <CallToAction
        title="Join Our Platform"
        description="Find great opportunities"
        primaryAction={mockPrimaryAction}
        variant="primary"
      />
    );

    expect(container.querySelector('.cta-primary')).toBeInTheDocument();
  });

  test('renders star ratings correctly', () => {
    render(
      <CallToAction
        title="Join Our Platform"
        description="Find great opportunities"
        testimonials={mockTestimonials}
        primaryAction={mockPrimaryAction}
      />
    );

    // Check that SVG stars are rendered by looking for the star elements
    // First testimonial has 5 filled stars
    const filledStars1 = screen.getAllByTestId('star-filled');
    // Second testimonial has 4 filled stars and 1 empty star
    const emptyStars = screen.getAllByTestId('star-empty');
    
    // 5 filled stars from first testimonial + 4 filled stars from second testimonial = 9 filled stars
    expect(filledStars1.length).toBeGreaterThanOrEqual(9);
    // 1 empty star from second testimonial
    expect(emptyStars.length).toBeGreaterThanOrEqual(1);
  });
});