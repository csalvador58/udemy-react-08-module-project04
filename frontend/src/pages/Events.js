import { useLoaderData, json } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData();

  if (data.isError) {
    return <p>{data.message}</p>;
  }
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  // Code in this function is executed on the client side
  // Any browser functions can be used here (i.e. localStorage, cookies, etc)
  // React hooks are not allowed in loader functions and only available in React components
  // Loader functions are not a React component
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    throw json({ message: 'Could not fetch events.' }, { status: 500 });
  } else {
    return response;
  }
}
