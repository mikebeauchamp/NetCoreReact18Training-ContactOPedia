import React from "react";
import AddRandomContact from "./AddRandomContact";
import RemoveAllContact from "./RemoveAllContact";
import FavoriteContacts from "./FavoriteContacts";
import GeneralContacts from "./GeneralContacts";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import AddContact from "./AddContact";

export default class ContactIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: [
        {
          id: 1,
          name: "Ben Parker",
          phone: "555-555-5555",
          email: "bp@test.com",
          isFavorite: false,
        },
        {
          id: 2,
          name: "May Parker",
          phone: "555-555-5555",
          email: "mp@test.com",
          isFavorite: true,
        },
        {
          id: 3,
          name: "Peter Parker",
          phone: "555-555-5555",
          email: "spiderman@test.com",
          isFavorite: true,
        },
      ],
    };
  }

  handleAddContact = (newContact) => {
    if (newContact.name == "") {
      return { status: "failure", msg: "Please enter a valid name." };
    } else if (newContact.phone == "") {
      return { status: "failure", msg: "Please enter a valid phone number." };
    }

    const duplicateRecord = this.state.contactList.filter((x) => {
      if (x.name == newContact.name && x.phone == newContact.phone) {
        return true;
      }
    });
    if (duplicateRecord.length > 0) {
      return { status: "failure", msg: "Duplicate Record." };
    } else {
      const newFinalContact = {
        ...newContact,
        id: this.state.contactList[this.state.contactList.length - 1].id + 1,
        isFavorite: false,
      };
      this.setState((previousState) => {
        return {
          contactList: previousState.contactList.concat([newFinalContact]),
        };
      });
      return { status: "success", msg: "Contact was added successfully." };
    }
  };

  handleToggleFavorites = (contact) => {
    console.log(contact);
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ minHeight: "85vh" }}>
          <div className="row py-3">
            <div className="col-4 offset-2">
              <AddRandomContact />
            </div>
            <div className="col-4">
              <RemoveAllContact />
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <AddContact handleAddContact={this.handleAddContact} />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <FavoriteContacts
                  contacts={this.state.contactList.filter(
                    (c) => c.isFavorite == true
                  )}
                  favoriteClick={this.handleToggleFavorites}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <GeneralContacts
                  contacts={this.state.contactList.filter(
                    (c) => c.isFavorite == false
                  )}
                  favoriteClick={this.handleToggleFavorites}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
