import * as React from 'react';
import Navbar from './components/Navbar';
import AuthorPage from './components/AuthorPage';
import Previews from './components/Previews';
import FullBlog from './components/FullBlog';
import EditBlog from './components/EditBlog';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import Register from './components/Register';
import Donation from './components/Donation';
import Contact from './components/Contact';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"

const App = () => {

	const stripePromise = loadStripe('pk_test_51IGYi7HP7kyqMiMLH0fbfhYnS7T1S6JPEUkIAzW6wgLHyTiUS5lbgSqnK0LQbFjlua2YWHQz9oX8IYTAVtlAaSuo006RvLC0zZ');

	return (
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
	);
};

export default App;
