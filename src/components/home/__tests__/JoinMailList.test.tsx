import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider, theme } from "@chakra-ui/react";
import JoinMailingList from '@/components/home/JoinMailList';
import { ToastProvider, useToast } from "@chakra-ui/react";

// Mocking useToast hook from Chakra UI
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

describe('JoinMailingList Component', () => {
  const mockToast = jest.fn();

  beforeAll(() => {
    (useToast as jest.Mock).mockImplementation(() => mockToast);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <ChakraProvider theme={theme}>
        <ToastProvider>
          <JoinMailingList />
        </ToastProvider>
      </ChakraProvider>
    );
  };

  it('should render the component with heading and description', () => {
    renderComponent();
    expect(screen.getByText('Join Our Mailing List')).toBeInTheDocument();
    expect(screen.getByText(/Welcome to Lines and Colors/)).toBeInTheDocument();
  });

  it('should handle email input and validate', () => {
    renderComponent();
    const input = screen.getByPlaceholderText('Your email address');
    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input).toHaveValue('test@example.com');

    fireEvent.change(input, { target: { value: 'invalid-email' } });
    expect(input).toHaveValue('invalid-email');
  });

  it('should display success toast on valid email submission', async () => {
    renderComponent();
    const input = screen.getByPlaceholderText('Your email address');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input).toHaveValue('test@example.com');

    fireEvent.click(button);
    expect(await screen.findByText("Subscription successful.")).toBeInTheDocument();
  });

  it('should display error toast on invalid email submission', async () => {
    renderComponent();
    const input = screen.getByPlaceholderText('Your email address');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'invalid-email' } });
    expect(input).toHaveValue('invalid-email');

    fireEvent.click(button);
    expect(await screen.findByText("Subscription failed.")).toBeInTheDocument();
  });
});
