import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"

import Navbar from './components/Navbar';
import AuthorPage from './pages/AuthorPage';
import Previews from './pages/Previews';
import FullBlog from './pages/FullBlog';
import EditBlog from './pages/EditBlog';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import Register from './pages/Register';
import Donation from './pages/Donation';
import Contact from './pages/Contact';
import { ContextProvider } from './components/ContextProvider';

const App = () => {

	const stripePromise = loadStripe('pk_test_51IGYi7HP7kyqMiMLH0fbfhYnS7T1S6JPEUkIAzW6wgLHyTiUS5lbgSqnK0LQbFjlua2YWHQz9oX8IYTAVtlAaSuo006RvLC0zZ');

	return (
		<ContextProvider>
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Previews} />
					<Route path='/authorpage' component={AuthorPage} />
					<Route exact path='/blogs/:id' component={FullBlog} />
					<Route path='/blogs/:id/edit' component={EditBlog} />
					<Route path='/login' component={Login} />
					<Route path='/adminpage' component={AdminPage} />
					<Route path='/register' component={Register} />
					<Route path='/donate'>
						<Elements stripe={stripePromise}><Donation /></Elements>
					</Route>
					<Route path='/contact' component={Contact} />
				</Switch>
			</BrowserRouter>
		</ContextProvider>
	);
};

export default App;
