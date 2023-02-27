import NewMeetUpForm from "../../components/meetups/NewMeetupForm";

export default function NewMeetUp() {
  const addMeetupHandler = (enteredMeetupData) => {
    console.log(enteredMeetupData);
  };
  return <NewMeetUpForm onAddMeetup={addMeetupHandler} />;
}
