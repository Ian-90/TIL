import { useRouter } from "next/router";
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

export default function NewMeetUp() {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Add a Meetups</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetupHandler} />;
    </>
  );
}
