import { Link, useRouteError, isRouteErrorResponse } from 'react-router'

function NotFound() {
  const error = useRouteError()

  const status = isRouteErrorResponse(error) ? error.status : 404
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : 'This page could not be found.'

  return (
    <section id="center">
      <div>
        <h1>{status}</h1>
        <p>{message}</p>
      </div>
      <Link className="button-link" to="/">
        Back to dashboard
      </Link>
    </section>
  )
}

export default NotFound
