import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JoinPage from '@/app/join-page';

jest.mock('@/lib/TranslationContext', () => ({
  useTranslations: () => ({
    t: (key: string) => key,
    locale: 'en',
  }),
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
  Toaster: () => null,
}));

jest.mock('@/components/Header', () => ({
  __esModule: true,
  default: () => <div>Header</div>,
}));

jest.mock('@/components/Footer', () => ({
  __esModule: true,
  default: () => <div>Footer</div>,
}));

jest.mock('@/components/ui/card', () => ({
  Card: ({ children }: any) => <div>{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/input', () => ({
  __esModule: true,
  default: ({ onChange, value, ...props }: any) => (
    <input onChange={onChange} value={value} {...props} />
  ),
}));

jest.mock('@/components/ui/textarea', () => ({
  __esModule: true,
  default: ({ onChange, value, ...props }: any) => (
    <textarea onChange={onChange} value={value} {...props} />
  ),
}));

jest.mock('@/components/ui/sonner', () => ({
  Toaster: () => null,
}));

describe('JoinPage - Normal Membership', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Normal Membership option', () => {
    render(<JoinPage />);
    expect(screen.getByText('join.normalMembershipLabel')).toBeInTheDocument();
  });

  it('should display Normal Membership form with all required fields', async () => {
    render(<JoinPage />);
    
    const normalMembershipCard = screen.getAllByText('join.selectButton')[0];
    fireEvent.click(normalMembershipCard.closest('.cursor-pointer') || normalMembershipCard);

    await waitFor(() => {
      expect(screen.getByText('बहुजन क्रान्ति पार्टी')).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/नाम/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/जन्म तिथि/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/आयु/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/पिता\/पति का नाम/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/पता/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/राज्य/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/जिला\/शहर/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ईमेल/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/मो नं/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/पोलिंग स्टेशन का नाम/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/विधानसभा निर्वाचन क्षेत्र/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/दिनांक/i)).toBeInTheDocument();
  });

  it('should show pledge modal when submitting Normal Membership form', async () => {
    render(<JoinPage />);
    
    const normalMembershipCard = screen.getAllByText('join.selectButton')[0];
    fireEvent.click(normalMembershipCard.closest('.cursor-pointer') || normalMembershipCard);

    await waitFor(() => {
      expect(screen.getByLabelText(/नाम/i)).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText(/नाम/i);
    const dobInput = screen.getByLabelText(/जन्म तिथि/i);
    const ageInput = screen.getByLabelText(/आयु/i);
    const fatherInput = screen.getByLabelText(/पिता\/पति का नाम/i);
    const addressInput = screen.getByLabelText(/पता/i);
    const stateSelect = screen.getByLabelText(/राज्य/i);
    const districtInput = screen.getByLabelText(/जिला\/शहर/i);
    const emailInput = screen.getByLabelText(/ईमेल/i);
    const mobileInput = screen.getByLabelText(/मो नं/i);
    const dateInput = screen.getByLabelText(/दिनांक/i);

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(dobInput, '1990-01-01');
    await userEvent.type(ageInput, '34');
    await userEvent.type(fatherInput, 'Father Name');
    await userEvent.type(addressInput, '123 Main Street');
    await userEvent.selectOptions(stateSelect, 'Maharashtra');
    await userEvent.type(districtInput, 'Mumbai');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(mobileInput, '9876543210');
    await userEvent.type(dateInput, '2024-01-01');

    const submitButton = screen.getByRole('button', { name: /आवेदन जमा करें/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/घोषणापत्र \(शपथ\)/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/मैं बहुजन क्रांति पार्टी के लक्ष्यों/i)).toBeInTheDocument();
    expect(screen.getByText(/मैं समाजवाद के आदर्शों पर/i)).toBeInTheDocument();
    expect(screen.getByText(/मैं मजदूर वर्ग/i)).toBeInTheDocument();
  });

  it('should require checkbox acceptance before submitting pledge', async () => {
    render(<JoinPage />);
    
    const normalMembershipCard = screen.getAllByText('join.selectButton')[0];
    fireEvent.click(normalMembershipCard.closest('.cursor-pointer') || normalMembershipCard);

    await waitFor(() => {
      expect(screen.getByLabelText(/नाम/i)).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText(/नाम/i);
    const dobInput = screen.getByLabelText(/जन्म तिथि/i);
    const ageInput = screen.getByLabelText(/आयु/i);
    const fatherInput = screen.getByLabelText(/पिता\/पति का नाम/i);
    const addressInput = screen.getByLabelText(/पता/i);
    const stateSelect = screen.getByLabelText(/राज्य/i);
    const districtInput = screen.getByLabelText(/जिला\/शहर/i);
    const mobileInput = screen.getByLabelText(/मो नं/i);
    const dateInput = screen.getByLabelText(/दिनांक/i);

    await userEvent.type(nameInput, 'Jane Doe');
    await userEvent.type(dobInput, '1995-05-15');
    await userEvent.type(ageInput, '29');
    await userEvent.type(fatherInput, 'Father Name');
    await userEvent.type(addressInput, '456 Oak Avenue');
    await userEvent.selectOptions(stateSelect, 'Delhi');
    await userEvent.type(districtInput, 'New Delhi');
    await userEvent.type(mobileInput, '9876543211');
    await userEvent.type(dateInput, '2024-01-02');

    const submitButton = screen.getByRole('button', { name: /आवेदन जमा करें/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/घोषणापत्र \(शपथ\)/i)).toBeInTheDocument();
    });

    const pledgeCheckbox = screen.getByLabelText(/मैं ने ऊपर दिए गए घोषणापत्र को पढ़ा/i);
    const informationCheckbox = screen.getByLabelText(/मैं प्रमाणित करता/i);
    const submitPledgeButton = screen.getByRole('button', { name: /जमा करें/i });

    expect(submitPledgeButton).toBeDisabled();

    await userEvent.click(pledgeCheckbox);
    expect(submitPledgeButton).toBeDisabled();

    await userEvent.click(informationCheckbox);
    expect(submitPledgeButton).not.toBeDisabled();
  });

  it('should have blue styling for Normal Membership and red for Active Membership', () => {
    render(<JoinPage />);
    
    const normalCard = screen.getByText('join.normalMembershipLabel').closest('.cursor-pointer');
    const activeCard = screen.getByText('join.activeMembershipLabel').closest('.cursor-pointer');

    expect(normalCard).toHaveClass('border-blue-500');
    expect(activeCard).toHaveClass('border-red-500');
  });
});
