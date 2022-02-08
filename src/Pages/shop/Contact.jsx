import { Helmet } from 'react-helmet';
import ContactDetails from "../../components/shop/contact/ContactDetails";
import Message from '../../components/shop/contact/Message';

const Contact = () => {
  return (
      <>
        <Helmet><title>Tulin Bicycle Shop | Contact Us</title></Helmet>
        <ContactDetails />
        <Message />
      </>
  );
};

export default Contact;
