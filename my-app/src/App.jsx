import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddContacts from './components/AddContacts/AddContacts';
import ContactsList from './components/ContactsList/ContactsList';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, fetchContacts } from './store/contactActions';

import './App.scss';

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (newContact) => {
    newContact.id = Date.now();
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleCancel = () => {

  };

  return (
      <Router>
        <div>
          <div className='header'>
        <Link to='/' className='header-button'>Contacts</Link>
        <Link to='/add' className='header-button'>Add Contact</Link>
      </div>
      <Routes>
        <Route exact path='/' element={<ContactsList contacts={contacts} onDeleteContact={handleDeleteContact} />} />
        <Route path='/add' element={<AddContacts onSaveContact={handleAddContact} onCancel={handleCancel} />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
