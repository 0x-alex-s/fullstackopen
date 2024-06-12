import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameToFilter, setNameToFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      personService.create(personObject).then((person) => {
        setPersons(persons.concat(person));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      personService.deleteRecord(person.id);
      setPersons(persons.filter((p) => p.id !== person.id));
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = (event) => {
    setNameToFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        nameFilter={nameToFilter}
        filterHandler={handleFilterNameChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addPersonHandler={addPerson}
        newNameValue={newName}
        nameChangeHandler={handleNameChange}
        newNumberValue={newNumber}
        numberChangeHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons.filter((person) =>
          person.name.match(new RegExp(nameToFilter, "gi"))
        )}
        deleteHandler={handleDelete}
      />
    </div>
  );
};

export default App;
