import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserStatus } from '@/enums/index.enum';
import { StatusBadge } from '@/components/molecules/StatusBadge';

describe('StatusBadge Component', () => {
  it('debe mostrar el texto "Online" correctamente', () => {
    render(<StatusBadge status={UserStatus.ONLINE} />);
    
    expect(screen.getByText(/online/i)).toBeInTheDocument();
  });

  it('debe aplicar la clase de color verde para el estado online', () => {
    render(<StatusBadge status={UserStatus.ONLINE} />);
    
    const badge = screen.getByText(/online/i);
    expect(badge).toHaveClass('text-green-700'); 
  });

  it('debe mostrar "Offline" cuando el estado es offline', () => {
    render(<StatusBadge status={UserStatus.OFFLINE} />);
    expect(screen.getByText(/offline/i)).toBeInTheDocument();
  });
});