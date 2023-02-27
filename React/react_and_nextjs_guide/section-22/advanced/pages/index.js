import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUP = [
  {
    id: "m1",
    title: "A First Meetup",
    image: "https://picsum.photos/1000/800",
    address: "Some address",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image: "https://picsum.photos/1000/800",
    address: "Some address",
    description: "This is a first meetup!",
  },
];

export default function Home() {
  return <MeetupList meetups={DUMMY_MEETUP} />;
}
