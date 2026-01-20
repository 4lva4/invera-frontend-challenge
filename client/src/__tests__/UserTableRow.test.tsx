import { render, screen, fireEvent } from '@testing-library/react';
import { UserTableRow } from '../components/organisms/UserTableRow';
import { User, UserStatus, UserType, UserCategory } from '@/types';

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@doe.com',
  type: UserType.SOCIAL,
  category: UserCategory.NEW,  
  company: 'Invera',
  status: UserStatus.ONLINE,
  location: 'Argentina',
  phone: '123456'
};

describe('UserTableRow Component', () => {
  const mockOnEdit = jest.fn();

  it('debe renderizar la información básica del usuario', () => {
    render(
      <table>
        <tbody>
          <UserTableRow user={mockUser} index={0} onEdit={mockOnEdit} />
        </tbody>
      </table>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@doe.com')).toBeInTheDocument();
    expect(screen.getByText('Invera')).toBeInTheDocument();
  });

  it('debe llamar a la función onEdit cuando se pulsa el botón de editar', () => {
    mockOnEdit.mockClear();
    render(
      <table>
        <tbody>
          <UserTableRow user={mockUser} index={0} onEdit={mockOnEdit} />
        </tbody>
      </table>
    );

    const editButton = screen.getAllByRole('button')[0]; 
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalled();
  });
});