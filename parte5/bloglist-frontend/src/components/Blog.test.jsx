import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const blog = {
    id: '1',
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const mockUser = {
    username: 'testuser',
    name: 'Test User'
  }

  const mockUpdateBlog = vi.fn()
  const mockRemoveBlog = vi.fn()

  beforeEach(() => {
    container = render(
      <Blog 
        blog={blog} 
        updateBlog={mockUpdateBlog}
        removeBlog={mockRemoveBlog}
        user={mockUser}
      />
    ).container
  })

  test('renders title and author but not url or likes by default', () => {
    // Verifica que se muestran título y autor
    expect(screen.getByText('Component testing is done with react-testing-library Test Author')).toBeDefined()
    
    // Verifica que los detalles están ocultos por defecto
    const detailsDiv = container.querySelector('[style*="display: none"]')
    expect(detailsDiv).toHaveStyle('display: none')
  })

  test('shows url and likes when view button is clicked', async () => {
    const user = userEvent.setup()
    
    // Hacer click en el botón view
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    
    // Verificar que ahora se muestran URL y likes
    expect(screen.getByText('http://example.com')).toBeDefined()
    expect(screen.getByText('likes 5')).toBeDefined()
  })

  test('like button calls event handler twice when clicked twice', async () => {
    const user = userEvent.setup()
    
    // Hacer click en view para mostrar los detalles
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    
    // Hacer click en like dos veces
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    
    // Verificar que se llamó dos veces
    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })
}) 