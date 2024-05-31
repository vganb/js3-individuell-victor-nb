import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from "@/components/header"



it('should render the same headline', () => {
    render(<Header />); //ARRANGE
    const headingElement = screen.getByText('Welcome to Evento')// ACT
    expect(headingElement).toBeInTheDocument()// ASSERT
})