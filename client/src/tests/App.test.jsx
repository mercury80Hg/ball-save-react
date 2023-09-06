import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import History from '../routes/History'
import { createServer } from '../tests/server'

createServer([
  {
    path: '', //add request path
    method: 'get',
    res: (req) => {
      return {
        // enter return data
      }
    }
  }
])